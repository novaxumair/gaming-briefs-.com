import * as THREE from "three";
import { damp, hashSeed, lerp, noise1D, smoothDamp } from "./math";
import { spaceWorldInput } from "./input-bridge";
import type { QualitySettings } from "./quality";
import { getStarSpriteTexture } from "./star-texture";

type ShipState = {
  group: THREE.Group;
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  bank: number;
  seed: number;
  depth: number;
};

type LaserBolt = {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  active: boolean;
};

type Particle = {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  active: boolean;
};

function createRetroFighter(scale: number, accent: number): THREE.Group {
  const group = new THREE.Group();
  const hull = new THREE.MeshStandardMaterial({
    color: 0x6a7585,
    metalness: 0.82,
    roughness: 0.28,
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: accent,
    emissive: accent,
    emissiveIntensity: 0.35,
    metalness: 0.5,
    roughness: 0.4,
  });
  const engineMat = new THREE.MeshStandardMaterial({
    color: 0x44ccff,
    emissive: 0x2288cc,
    emissiveIntensity: 2.2,
    metalness: 0.2,
    roughness: 0.5,
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.35 * scale, 0.12 * scale, 1.1 * scale), hull);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.18 * scale, 0.45 * scale, 4), accentMat);
  nose.rotation.x = Math.PI / 2;
  nose.position.z = -0.72 * scale;

  const wingL = new THREE.Mesh(new THREE.BoxGeometry(1.1 * scale, 0.04 * scale, 0.42 * scale), hull);
  wingL.position.set(-0.55 * scale, 0, 0.15 * scale);
  const wingR = wingL.clone();
  wingR.position.x = 0.55 * scale;

  const fin = new THREE.Mesh(new THREE.BoxGeometry(0.08 * scale, 0.35 * scale, 0.25 * scale), accentMat);
  fin.position.set(0, 0.18 * scale, 0.45 * scale);

  const engineL = new THREE.Mesh(new THREE.BoxGeometry(0.14 * scale, 0.14 * scale, 0.2 * scale), engineMat);
  engineL.position.set(-0.22 * scale, 0, 0.58 * scale);
  const engineR = engineL.clone();
  engineR.position.x = 0.22 * scale;

  group.add(body, nose, wingL, wingR, fin, engineL, engineR);
  group.scale.setScalar(scale);
  return group;
}

export class SpaceWorldEngine {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private clock = new THREE.Clock();
  private raf = 0;
  private disposed = false;

  private stars: THREE.Points | null = null;
  private starSpeeds: Float32Array | null = null;
  private starCount = 0;

  private ships: ShipState[] = [];
  private lasers: LaserBolt[] = [];
  private particles: Particle[] = [];

  private nebulaMeshes: THREE.Mesh[] = [];
  private planets: THREE.Mesh[] = [];
  private debris: THREE.InstancedMesh | null = null;
  private debrisData: Float32Array;

  private forwardOffset = 0;
  private forwardVelocity = 0;
  private camRoll = 0;
  private camRollVel = { value: 0 };
  private explosionTimer = 0;
  private laserTimer = 0;

  private ambientLight: THREE.AmbientLight;
  private keyLight: THREE.DirectionalLight;
  private rimLight: THREE.PointLight;
  private explosionLight: THREE.PointLight;

  private quality: QualitySettings;
  private fpsSamples: number[] = [];
  private dynamicScale = 1;
  private effectsReady = false;
  private paused = false;
  private readonly debrisDummy = new THREE.Object3D();
  private sharedLaserGeo: THREE.CylinderGeometry | null = null;
  private sharedLaserMat: THREE.MeshBasicMaterial | null = null;
  private sharedParticleGeo: THREE.SphereGeometry | null = null;
  private sharedParticleMat: THREE.MeshBasicMaterial | null = null;

  constructor(canvas: HTMLCanvasElement, quality: QualitySettings) {
    this.quality = quality;
    this.debrisData = new Float32Array(120 * 3);

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: quality.tier !== "low",
      alpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, quality.dprCap));
    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.setClearColor(0x020408, 1);
    this.renderer.sortObjects = false;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x020408, 0.006);

    this.camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 400);
    this.camera.position.set(0, 0.1, 5.5);

    this.ambientLight = new THREE.AmbientLight(0x3a5070, 0.55);
    this.keyLight = new THREE.DirectionalLight(0xaaccff, 1.6);
    this.keyLight.position.set(4, 6, 8);
    this.rimLight = new THREE.PointLight(0x55bbee, 4, 100);
    this.rimLight.position.set(-8, 2, -12);
    this.explosionLight = new THREE.PointLight(0xff8844, 0, 50);
    this.explosionLight.position.set(0, 0, -20);

    const hemi = new THREE.HemisphereLight(0x224466, 0x020408, 0.45);
    this.scene.add(hemi);

    this.scene.add(this.ambientLight, this.keyLight, this.rimLight, this.explosionLight);

    this.buildStars();
  }

  /** Load heavier scene content after first paint. */
  initEffects(): void {
    if (this.effectsReady || this.disposed) return;
    this.effectsReady = true;
    this.buildNebula();
    this.buildPlanets();
    this.buildShips();
    this.buildLasers();
    this.buildParticles();
    this.buildDebris();
  }

  private buildStars(): void {
    this.starCount = this.quality.starCount;
    const positions = new Float32Array(this.starCount * 3);
    this.starSpeeds = new Float32Array(this.starCount);

    for (let i = 0; i < this.starCount; i++) {
      const r = hashSeed(i * 3.17);
      const theta = hashSeed(i * 7.91) * Math.PI * 2;
      const radius = 8 + hashSeed(i * 1.33) * 120;
      positions[i * 3] = Math.cos(theta) * radius * (0.3 + r * 0.7);
      positions[i * 3 + 1] = (hashSeed(i * 5.2) - 0.5) * 60;
      positions[i * 3 + 2] = -20 - hashSeed(i * 2.8) * 280;
      this.starSpeeds[i] = 0.6 + hashSeed(i * 9.4) * 1.8;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      map: getStarSpriteTexture(),
      color: 0xffffff,
      size: this.quality.tier === "low" ? 1.2 : 1.8,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      alphaTest: 0.02,
    });

    this.stars = new THREE.Points(geometry, material);
    this.scene.add(this.stars);
  }

  private buildNebula(): void {
    for (let i = 0; i < this.quality.nebulaLayers; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0x1a4a6a : i === 1 ? 0x243858 : 0x142838,
        transparent: true,
        opacity: 0.05 + i * 0.025,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(320, 160), mat);
      mesh.position.set((i - 1) * 30, (i - 0.5) * 6, -110 - i * 50);
      mesh.rotation.z = 0.08 * i;
      this.nebulaMeshes.push(mesh);
      this.scene.add(mesh);
    }
  }

  private buildPlanets(): void {
    const colors = [0x224466, 0x1a3355, 0x332244];
    for (let i = 0; i < this.quality.planetCount; i++) {
      const radius = 4 + hashSeed(i * 4.1) * 8;
      const mat = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        emissive: 0x112233,
        emissiveIntensity: 0.15,
        metalness: 0.1,
        roughness: 0.85,
      });
      const planet = new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 12), mat);
      planet.position.set(
        (hashSeed(i * 2.3) - 0.5) * 80,
        (hashSeed(i * 6.7) - 0.5) * 30,
        -120 - hashSeed(i * 8.2) * 100,
      );
      this.planets.push(planet);
      this.scene.add(planet);
    }
  }

  private buildShips(): void {
    const accents = [0x8899aa, 0x667788, 0x99aabb, 0x556677, 0x778899];
    for (let i = 0; i < this.quality.shipCount; i++) {
      const depth = 0.35 + hashSeed(i * 3.3) * 0.65;
      const scale = 0.5 + depth * 0.9;
      const group = createRetroFighter(scale, accents[i % accents.length]);
      group.position.set(
        (hashSeed(i * 11.1) - 0.5) * 22,
        (hashSeed(i * 4.4) - 0.5) * 10,
        -12 - hashSeed(i * 7.7) * 35,
      );
      group.rotation.y = hashSeed(i * 9.9) * Math.PI * 2;

      this.scene.add(group);
      this.ships.push({
        group,
        velocity: new THREE.Vector3(
          (hashSeed(i * 1.8) - 0.5) * 2.5,
          (hashSeed(i * 2.6) - 0.5) * 0.8,
          4 + hashSeed(i * 5.5) * 6,
        ),
        angularVelocity: new THREE.Vector3(
          (hashSeed(i * 3.1) - 0.5) * 0.15,
          (hashSeed(i * 6.2) - 0.5) * 0.25,
          (hashSeed(i * 8.8) - 0.5) * 0.35,
        ),
        bank: 0,
        seed: i * 17.3,
        depth,
      });
    }

    const heroShip = createRetroFighter(1.15, 0x99bbcc);
    heroShip.position.set(3.5, -0.8, -16);
    heroShip.rotation.y = -0.35;
    this.scene.add(heroShip);
    this.ships.push({
      group: heroShip,
      velocity: new THREE.Vector3(-0.4, 0.1, 8),
      angularVelocity: new THREE.Vector3(0, 0.05, 0.08),
      bank: 0,
      seed: 999,
      depth: 0.9,
    });
  }

  private buildLasers(): void {
    this.sharedLaserGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.8, 4);
    this.sharedLaserMat = new THREE.MeshBasicMaterial({
      color: 0xff6644,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    for (let i = 0; i < this.quality.maxLasers; i++) {
      const mesh = new THREE.Mesh(this.sharedLaserGeo, this.sharedLaserMat!.clone());
      mesh.visible = false;
      this.scene.add(mesh);
      this.lasers.push({
        mesh,
        velocity: new THREE.Vector3(),
        life: 0,
        active: false,
      });
    }
  }

  private buildParticles(): void {
    this.sharedParticleGeo = new THREE.SphereGeometry(0.06, 4, 4);
    this.sharedParticleMat = new THREE.MeshBasicMaterial({
      color: 0xffaa66,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    for (let i = 0; i < this.quality.maxParticles; i++) {
      const mesh = new THREE.Mesh(this.sharedParticleGeo, this.sharedParticleMat!.clone());
      mesh.visible = false;
      this.scene.add(mesh);
      this.particles.push({
        mesh,
        velocity: new THREE.Vector3(),
        life: 0,
        maxLife: 1,
        active: false,
      });
    }
  }

  private buildDebris(): void {
    const geo = new THREE.OctahedronGeometry(0.05, 0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x445566,
      metalness: 0.45,
      roughness: 0.65,
      transparent: true,
      opacity: 0.55,
    });
    this.debris = new THREE.InstancedMesh(geo, mat, 40);
    this.debris.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.debris.count = this.quality.tier === "low" ? 12 : 40;
    this.scene.add(this.debris);
  }

  private spawnLaser(from: THREE.Vector3, direction: THREE.Vector3): void {
    const bolt = this.lasers.find((l) => !l.active);
    if (!bolt) return;
    bolt.active = true;
    bolt.life = 0.55 + hashSeed(from.x + from.y) * 0.3;
    bolt.mesh.position.copy(from);
    bolt.mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
    bolt.velocity.copy(direction).multiplyScalar(28 + hashSeed(from.z) * 18);
    bolt.mesh.visible = true;
    const scale = 0.6 + hashSeed(from.x * 3) * 0.8;
    bolt.mesh.scale.set(scale, scale * (1.5 + hashSeed(from.y) * 2), scale);
  }

  private spawnExplosion(at: THREE.Vector3, intensity = 1): void {
    let spawned = 0;
    const count = Math.floor(12 + intensity * 18 * this.dynamicScale);
    for (const p of this.particles) {
      if (p.active) continue;
      p.active = true;
      p.life = 0;
      p.maxLife = 0.5 + hashSeed(at.x + spawned) * 0.9;
      p.mesh.position.copy(at);
      p.mesh.visible = true;
      const mat = p.mesh.material as THREE.MeshBasicMaterial;
      mat.color.setHex(hashSeed(spawned + at.y) > 0.5 ? 0xffaa55 : 0xffdd88);
      p.velocity.set(
        (hashSeed(spawned * 1.1) - 0.5) * 8 * intensity,
        (hashSeed(spawned * 2.2) - 0.5) * 8 * intensity,
        (hashSeed(spawned * 3.3) - 0.5) * 8 * intensity,
      );
      spawned++;
      if (spawned >= count) break;
    }
    this.explosionLight.position.copy(at);
    this.explosionLight.intensity = 4 * intensity;
  }

  private updateStars(dt: number, speed: number): void {
    if (!this.stars || !this.starSpeeds) return;
    const pos = this.stars.geometry.attributes.position as THREE.BufferAttribute;
    const mat = this.stars.material as THREE.PointsMaterial;
    mat.size = (this.quality.tier === "low" ? 1.2 : 1.8) * (1 + speed * 0.012);

    for (let i = 0; i < this.starCount; i++) {
      let z = pos.getZ(i);
      z += speed * this.starSpeeds[i] * dt * (1 + this.dynamicScale * 0.2);
      if (z > 8) z = -280 - hashSeed(i * 2.1) * 80;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  }

  private updateShips(dt: number, scroll: number): void {
    for (const ship of this.ships) {
      const t = performance.now() * 0.001 + ship.seed;
      const wanderX = noise1D(t * 0.15, ship.seed) * 2 - 1;
      const wanderY = noise1D(t * 0.12, ship.seed + 50) * 1.2 - 0.6;

      ship.velocity.x = damp(ship.velocity.x, wanderX * 3, 1.2, dt);
      ship.velocity.y = damp(ship.velocity.y, wanderY * 1.5, 1.2, dt);

      ship.group.position.x += ship.velocity.x * dt;
      ship.group.position.y += ship.velocity.y * dt;
      ship.group.position.z += ship.velocity.z * dt * (0.85 + scroll * 0.35);

      ship.group.rotation.x = damp(ship.group.rotation.x, wanderY * 0.35, 2.5, dt);
      ship.group.rotation.z = damp(
        ship.group.rotation.z,
        -ship.velocity.x * 0.12 + Math.sin(t * 0.8) * 0.08,
        2.5,
        dt,
      );
      ship.group.rotation.y += ship.angularVelocity.y * dt;

      if (ship.group.position.z > 12) {
        ship.group.position.z = -90 - hashSeed(ship.seed + t) * 60;
        ship.group.position.x = (hashSeed(ship.seed + 1) - 0.5) * 35;
        ship.group.position.y = (hashSeed(ship.seed + 2) - 0.5) * 14;
      }

      if (hashSeed(Math.floor(t * 3) + ship.seed) > 0.92 && this.quality.tier !== "low") {
        const dir = new THREE.Vector3(
          (hashSeed(t) - 0.5) * 0.4,
          (hashSeed(t + 1) - 0.5) * 0.2,
          -1,
        ).normalize();
        this.spawnLaser(ship.group.position.clone(), dir);
      }
    }
  }

  private updateLasers(dt: number): void {
    for (const bolt of this.lasers) {
      if (!bolt.active) continue;
      bolt.life -= dt;
      bolt.mesh.position.addScaledVector(bolt.velocity, dt);
      const mat = bolt.mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, bolt.life * 1.6);
      if (bolt.life <= 0) {
        bolt.active = false;
        bolt.mesh.visible = false;
      }
    }
  }

  private updateParticles(dt: number): void {
    for (const p of this.particles) {
      if (!p.active) continue;
      p.life += dt;
      p.mesh.position.addScaledVector(p.velocity, dt);
      p.velocity.multiplyScalar(1 - dt * 1.8);
      const mat = p.mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 1 - p.life / p.maxLife);
      const s = 1 + p.life * 2.5;
      p.mesh.scale.setScalar(s);
      if (p.life >= p.maxLife) {
        p.active = false;
        p.mesh.visible = false;
      }
    }
    this.explosionLight.intensity = damp(this.explosionLight.intensity, 0, 6, dt);
  }

  private updateDebris(dt: number, speed: number): void {
    if (!this.debris) return;
    const dummy = this.debrisDummy;
    for (let i = 0; i < this.debris.count; i++) {
      const ix = i * 3;
      let x = this.debrisData[ix];
      let y = this.debrisData[ix + 1];
      let z = this.debrisData[ix + 2];
      if (z === 0 && x === 0 && y === 0) {
        x = (hashSeed(i * 1.7) - 0.5) * 40;
        y = (hashSeed(i * 2.9) - 0.5) * 20;
        z = -hashSeed(i * 4.3) * 120;
      }
      z += speed * dt * (1.5 + hashSeed(i) * 2);
      if (z > 10) z = -140 - hashSeed(i + performance.now() * 0.001) * 60;
      this.debrisData[ix] = x;
      this.debrisData[ix + 1] = y;
      this.debrisData[ix + 2] = z;
      dummy.position.set(x, y, z);
      dummy.rotation.set(i * 0.3, i * 0.7, i * 0.2);
      dummy.updateMatrix();
      this.debris.setMatrixAt(i, dummy.matrix);
    }
    this.debris.instanceMatrix.needsUpdate = true;
  }

  private tick = (): void => {
    if (this.disposed || this.paused) return;
    const dt = Math.min(this.clock.getDelta(), 0.05);
    const input = spaceWorldInput;
    const motionScale = input.reducedMotion ? 0.35 : 1;

    input.scrollCurrent = smoothDamp(
      input.scrollCurrent,
      input.scrollTarget,
      { value: input.scrollVelocity },
      0.45,
      dt,
    );

    input.mouseX = damp(input.mouseX, input.mouseTargetX, 3.5, dt);
    input.mouseY = damp(input.mouseY, input.mouseTargetY, 3.5, dt);

    const scroll = input.scrollCurrent;
    const route = input.routePhase;

    const baseSpeed = (lerp(16, 32, scroll) + input.uiHover * 2) * motionScale;
    this.forwardVelocity = damp(this.forwardVelocity, baseSpeed, 1.8, dt);
    this.forwardOffset += this.forwardVelocity * dt;

    const mouseYaw = input.mouseX * 0.55;
    const mousePitch = input.mouseY * 0.28;
    const targetRoll = input.mouseX * 0.12 + Math.sin(this.forwardOffset * 0.02) * 0.04;
    this.camRoll = smoothDamp(this.camRoll, targetRoll, this.camRollVel, 0.35, dt);

    this.camera.position.x = damp(this.camera.position.x, mouseYaw * 2.2, 2.8, dt);
    this.camera.position.y = damp(
      this.camera.position.y,
      0.15 + mousePitch * 1.4 - scroll * 0.8 + route * 0.3,
      2.8,
      dt,
    );
    this.camera.position.z = damp(this.camera.position.z, 5.5 + scroll * 1.8, 2.5, dt);

    this.camera.rotation.set(
      damp(this.camera.rotation.x, mousePitch * 0.08 - scroll * 0.03, 3, dt),
      damp(this.camera.rotation.y, mouseYaw * 0.06, 3, dt),
      damp(this.camera.rotation.z, this.camRoll, 3, dt),
    );

    const parallax = this.forwardVelocity * 0.015;

    this.updateStars(dt, this.forwardVelocity);

    if (this.effectsReady) {
      for (let i = 0; i < this.nebulaMeshes.length; i++) {
        const n = this.nebulaMeshes[i];
        n.position.z = damp(n.position.z, -110 - i * 50 + scroll * 15, 1.5, dt);
        n.position.x = damp(n.position.x, (i - 1) * 30 + input.mouseX * 2.5, 2, dt);
      }

      for (const planet of this.planets) {
        planet.position.z += parallax * dt * 8;
        if (planet.position.z > 20) planet.position.z -= 200;
        planet.rotation.y += dt * 0.04;
      }

      this.updateShips(dt, scroll);
      this.updateLasers(dt);
      this.updateParticles(dt);
      this.updateDebris(dt, this.forwardVelocity);

      this.explosionTimer -= dt;
      if (this.explosionTimer <= 0 && this.quality.tier !== "low") {
        const ship = this.ships[Math.floor(hashSeed(this.forwardOffset) * this.ships.length)];
        if (ship) {
          const offset = new THREE.Vector3(
            (hashSeed(this.forwardOffset) - 0.5) * 8,
            (hashSeed(this.forwardOffset + 1) - 0.5) * 4,
            ship.group.position.z - 5,
          );
          this.spawnExplosion(offset, 0.6 + hashSeed(this.forwardOffset + 2) * 0.8);
        }
        this.explosionTimer =
          ((1.4 + hashSeed(this.forwardOffset * 0.1) * 2.5) / this.quality.explosionRate) /
          motionScale;
      }

      this.laserTimer -= dt;
      if (this.laserTimer <= 0) {
        const ship = this.ships[0];
        if (ship) {
          this.spawnLaser(
            ship.group.position.clone().add(new THREE.Vector3(0, 0, -0.5)),
            new THREE.Vector3(0.1, 0, -1).normalize(),
          );
        }
        this.laserTimer = (0.28 + hashSeed(performance.now() * 0.001) * 0.4) / motionScale;
      }
    }

    this.trackFps(dt);

    this.renderer.render(this.scene, this.camera);
    this.raf = requestAnimationFrame(this.tick);
  };

  private trackFps(dt: number): void {
    if (dt <= 0) return;
    this.fpsSamples.push(1 / dt);
    if (this.fpsSamples.length > 40) this.fpsSamples.shift();
    if (this.fpsSamples.length < 20) return;
    const avg = this.fpsSamples.reduce((a, b) => a + b, 0) / this.fpsSamples.length;
    if (avg < 40 && this.dynamicScale > 0.55) {
      this.dynamicScale = damp(this.dynamicScale, 0.55, 2, dt);
    } else if (avg > 55 && this.dynamicScale < 1) {
      this.dynamicScale = damp(this.dynamicScale, 1, 1, dt);
    }
  }

  start(): void {
    this.clock.start();
    this.raf = requestAnimationFrame(this.tick);
  }

  pause(): void {
    if (this.paused || this.disposed) return;
    this.paused = true;
    cancelAnimationFrame(this.raf);
  }

  resume(): void {
    if (!this.paused || this.disposed) return;
    this.paused = false;
    this.clock.getDelta();
    this.raf = requestAnimationFrame(this.tick);
  }

  resize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, this.quality.dprCap) * (this.dynamicScale < 0.7 ? 0.85 : 1),
    );
    this.renderer.setSize(width, height, false);
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry.dispose();
        const mat = obj.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat.dispose();
      }
    });
    this.renderer.dispose();
  }
}
