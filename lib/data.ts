import { getFeaturedGameImage } from "./featured-game-images";

export const SITE = {
  name: "Gaming Briefs",
  domain: "https://gamingbriefs.com",
  domainHost: "gamingbriefs.com",
  title: "Gaming Briefs | Game Guides, Cheats & Tips",
  mainH1: "Gaming Briefs",
  heroTagline: "Game guides · updates · tips · cheats",
  heroLead:
    "Get the latest game updates, detailed guides, trending news, and expert tips — all in one place.",
  description:
    "Gaming Briefs is your ultimate gaming article hub for game guides, updates, patch notes, and cheat feature breakdowns. Compare aimbot, ESP, wallhack, and spoofer options by title.",
  blogsTitle: "Cheat Guides | Gaming Briefs",
  blogsMainH1: "Gaming Briefs",
  blogsHeroTagline: "Cheat guides · feature breakdowns · patch status · player picks",
  blogsHeroLead:
    "Deep-dive guides for every title in the catalog — see what ships, what changed, and what players are using before you buy.",
  blogsDescription:
    "Browse cheat guides by game with aimbot, ESP, wallhack, and spoofer feature lists, patch notes, and buyer FAQs on Gaming Briefs.",
  contactTitle: "Contact | Gaming Briefs Support",
  twitter: "@gamingbriefs",
  themeColor: "#0a0f0a",
  logo: "/images/favicon-invader.png",
  logoFull: "/images/favicon-invader.png",
  logoWidth: 36,
  logoHeight: 36,
  gaId: "G-F3G2WXE227",
} as const;

export interface Guide {
  slug: string;
  gameName: string;
  title: string;
  image: string;
  gif?: string | null;
  section: "popular" | "all";
}

const ALL_GUIDES: Guide[] = [
  {
    "slug": "escape-from-tarkov",
    "gameName": "Escape from Tarkov",
    "title": "Escape from Tarkov",
    "image": "/cs/uploads/202508/phpollxon_split_escape_from_tarkov.jpg",
    "gif": "/cs/uploads/202509/php16osmi_split_eft.gif",
    "section": "popular"
  },
  {
    "slug": "rust",
    "gameName": "RUST",
    "title": "RUST",
    "image": "/cs/uploads/202508/phpzm4rtl_split_rust.jpg",
    "gif": "/cs/uploads/202509/phpp8qrxe_split_rust.gif",
    "section": "popular"
  },
  {
    "slug": "dayz",
    "gameName": "DayZ",
    "title": "DayZ",
    "image": "/cs/uploads/202508/phpwwohth_split_dayz_cheats.jpg",
    "gif": "/cs/uploads/202509/phpnttn2h_split_dayz.gif",
    "section": "popular"
  },
  {
    "slug": "pubg",
    "gameName": "PUBG",
    "title": "PUBG",
    "image": "/cs/uploads/202508/phpjwcwon_split_pubg_cheats.jpg",
    "gif": "/cs/uploads/202509/phpybio0q_split_pubg.gif",
    "section": "popular"
  },
  {
    "slug": "battlefield-6",
    "gameName": "Battlefield 6",
    "title": "Battlefield 6",
    "image": "/cs/uploads/202512/phpnhvbo3_split_666.jpg",
    "gif": "/cs/uploads/202512/battlefield6.gif",
    "section": "popular"
  },
  {
    "slug": "koboom",
    "gameName": "KoBoom",
    "title": "KoBoom",
    "image": "/cs/uploads/202510/phpb9urod_split_koboom_katalog.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "call-of-duty-black-ops-7",
    "gameName": "Call of Duty: Black Ops 7",
    "title": "Call of Duty: Black Ops 7",
    "image": "/cs/uploads/202510/phpj46zur_split_cod_bo7_katalog.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "roblox",
    "gameName": "Roblox",
    "title": "Roblox",
    "image": "/cs/uploads/202510/phpyv8yck_split_roblox_katalog.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "duet-night-abyss",
    "gameName": "Duet Night Abyss",
    "title": "Duet Night Abyss",
    "image": "/cs/uploads/202511/phpedzpb3_split_duet_katalog.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "pioneers-of-pagonia",
    "gameName": "Pioneers of Pagonia",
    "title": "Pioneers of Pagonia",
    "image": "/cs/uploads/202511/phpknyofl_split_pioner_katalog.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "team-fortress-2",
    "gameName": "Team Fortress 2",
    "title": "Team Fortress 2",
    "image": "/cs/uploads/202512/phpix83xi_split_tf2_katalog.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "brawlhalla",
    "gameName": "Brawlhalla",
    "title": "Brawlhalla",
    "image": "/cs/uploads/202512/phpl8mkbt_split_brawlh_katalog.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "hytale",
    "gameName": "Hytale",
    "title": "Hytale",
    "image": "/cs/uploads/202601/php7vwjql_split_hytale_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "megabonk",
    "gameName": "Megabonk",
    "title": "Megabonk",
    "image": "/cs/uploads/202601/phpwwdbzc_split_megabonk_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "company-of-heroes-3",
    "gameName": "Company of Heroes 3",
    "title": "Company of Heroes 3",
    "image": "/cs/uploads/202602/php2h4rd7_split_company_hero_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "marathon",
    "gameName": "Marathon",
    "title": "Marathon",
    "image": "/cs/uploads/202602/php9vf9cf_split_marathon_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "7-days-to-die",
    "gameName": "7 Days to Die",
    "title": "7 Days to Die",
    "image": "/cs/uploads/202602/phpbf8npx_split_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "humanitz",
    "gameName": "HumanitZ",
    "title": "HumanitZ",
    "image": "/cs/uploads/202602/phpiecrzz_split_katalog_humanitz.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "the-division-2",
    "gameName": "The Division 2",
    "title": "The Division 2",
    "image": "/cs/uploads/202603/php6fty7a_split_division2_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "russian-fishing-4",
    "gameName": "Russian Fishing 4",
    "title": "Russian Fishing 4",
    "image": "/cs/uploads/202603/phpwc8yi9_split_ru_fish_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "the-seven-deadly-sins",
    "gameName": "The Seven Deadly Sins",
    "title": "The Seven Deadly Sins",
    "image": "/cs/uploads/202605/php0tc0oy_split_the_seven_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "neverness-to-everness",
    "gameName": "Neverness to Everness",
    "title": "Neverness to Everness",
    "image": "/cs/uploads/202605/php2bupsa_split_nte_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "mongil-star-dive",
    "gameName": "Mongil: Star Dive",
    "title": "Mongil: Star Dive",
    "image": "/cs/uploads/202605/phpff3kt5_split_mongil_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "windrose",
    "gameName": "Windrose",
    "title": "Windrose",
    "image": "/cs/uploads/202605/phprgvl8p_split_windrose_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "ark-survival-ascended",
    "gameName": "ARK: Survival Ascended",
    "title": "ARK: Survival Ascended",
    "image": "/cs/uploads/202605/phpwnlutl_split_ark_endf_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "vostok",
    "gameName": "Vostok",
    "title": "Vostok",
    "image": "/cs/uploads/202606/phpaivxiq_split_vostok_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "mecha-break",
    "gameName": "Mecha BREAK",
    "title": "Mecha BREAK",
    "image": "/cs/uploads/202607/phpjgwisf_split_meccha_chameleon_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "sand",
    "gameName": "SAND",
    "title": "SAND",
    "image": "/cs/uploads/202607/phpvd5yvv_split_sand_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "cod-bocw",
    "gameName": "Cod Bocw",
    "title": "Cod Bocw",
    "image": "/cs/uploads/202402/phpsmx3fu_split_cod_bocw_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "rocket",
    "gameName": "Rocket",
    "title": "Rocket",
    "image": "/cs/uploads/202402/phpvudesf_split_rocket_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "realm",
    "gameName": "Realm",
    "title": "Realm",
    "image": "/cs/uploads/202402/phpyqtrxu_split_realm_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "swbf",
    "gameName": "Swbf",
    "title": "Swbf",
    "image": "/cs/uploads/202403/php48stkg_split_swbf_w_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "titanfall2",
    "gameName": "Titanfall2",
    "title": "Titanfall2",
    "image": "/cs/uploads/202403/phpcwy2ac_split_titanfall2_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "wows",
    "gameName": "Wows",
    "title": "Wows",
    "image": "/cs/uploads/202403/phpegxbxa_split_wows_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "halo",
    "gameName": "Halo",
    "title": "Halo",
    "image": "/cs/uploads/202403/phpi8kcqr_split_halo_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "hd2",
    "gameName": "Hd2",
    "title": "Hd2",
    "image": "/cs/uploads/202403/phpj51yc5_split_hd2_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "starship",
    "gameName": "Starship",
    "title": "Starship",
    "image": "/cs/uploads/202403/phprium9q_split_starship_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "insurge",
    "gameName": "Insurge",
    "title": "Insurge",
    "image": "/cs/uploads/202403/phpukcgsn_split_insurge_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "moe",
    "gameName": "Moe",
    "title": "Moe",
    "image": "/cs/uploads/202403/phpvduniv_split_moe_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "six-day-ful",
    "gameName": "Six Day Ful",
    "title": "Six Day Ful",
    "image": "/cs/uploads/202404/php8sestf_split_six_day_ful_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "tptr",
    "gameName": "Tptr",
    "title": "Tptr",
    "image": "/cs/uploads/202404/phped53u3_split_tptr_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "atlas",
    "gameName": "Atlas",
    "title": "Atlas",
    "image": "/cs/uploads/202404/phpl8tn9d_split_atlas_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "isle",
    "gameName": "Isle",
    "title": "Isle",
    "image": "/cs/uploads/202404/phpwwouuv_split_isle_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "conan",
    "gameName": "Conan",
    "title": "Conan",
    "image": "/cs/uploads/202404/phpwyc3bn_split_conan_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "wunthering",
    "gameName": "Wunthering",
    "title": "Wunthering",
    "image": "/cs/uploads/202405/php2qaa9d_split_wunthering_w_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "wot-blitz",
    "gameName": "Wot Blitz",
    "title": "Wot Blitz",
    "image": "/cs/uploads/202405/phpkt8mmk_split_wot_blitz_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "gray-zone",
    "gameName": "Gray Zone",
    "title": "Gray Zone",
    "image": "/cs/uploads/202405/phpqmglss_split_gray_zone_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "chess",
    "gameName": "Chess",
    "title": "Chess",
    "image": "/cs/uploads/202405/phpyauzz2_split_chess_katalog_1.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "gray-zone-warfare",
    "gameName": "Gray Zone Warfare",
    "title": "Gray Zone Warfare",
    "image": "/cs/uploads/202406/php9gpvpu_split_kkfos_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "bodycam",
    "gameName": "Bodycam",
    "title": "Bodycam",
    "image": "/cs/uploads/202406/phpasc04g_split_bodycam_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "once-human",
    "gameName": "Once Human",
    "title": "Once Human",
    "image": "/cs/uploads/202406/phpdyqm3l_split_once_humen_katalogn.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "l33t-ragemp",
    "gameName": "L33T RageMP",
    "title": "L33T RageMP",
    "image": "/cs/uploads/202406/phpg0a1s2_split_l33t_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "predecessor",
    "gameName": "Predecessor",
    "title": "Predecessor",
    "image": "/cs/uploads/202406/phpwavqqx_split_predecessor_katalogh.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "the-first-descendant",
    "gameName": "The First Descendant",
    "title": "The First Descendant",
    "image": "/cs/uploads/202407/phpxg3qdp_split_tfd_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "zenless-zone-zero",
    "gameName": "Zenless Zone Zero",
    "title": "Zenless Zone Zero",
    "image": "/cs/uploads/202407/phpys5xq0_split_zenless_zone_zero_katalog1.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "deadlock",
    "gameName": "Deadlock",
    "title": "Deadlock",
    "image": "/cs/uploads/202408/phptsq9ok_split_deadlock_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "sa-mp",
    "gameName": "SA-MP",
    "title": "SA-MP",
    "image": "/cs/uploads/202408/phpu46ji2_split_samp_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "duckside",
    "gameName": "Duckside",
    "title": "Duckside",
    "image": "/cs/uploads/202410/php0cpa1e_split_duckside_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "snowbreak-containment-zone",
    "gameName": "Snowbreak: Containment Zone",
    "title": "Snowbreak: Containment Zone",
    "image": "/cs/uploads/202410/php2htyon_split_snowbreak_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "level-zero",
    "gameName": "Level Zero",
    "title": "Level Zero",
    "image": "/cs/uploads/202410/phpcgv1cq_split_level_zero_ext_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "off-the-grid",
    "gameName": "Off the Grid",
    "title": "Off the Grid",
    "image": "/cs/uploads/202410/phpchz5bw_split_off_the_grid_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "black-desert-mobile",
    "gameName": "Black Desert Mobile",
    "title": "Black Desert Mobile",
    "image": "/cs/uploads/202410/phphd96eq_split_blaack_desert_mob_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "diablo-iv",
    "gameName": "Diablo IV",
    "title": "Diablo IV",
    "image": "/cs/uploads/202410/phpk3lt16_split_diablo_4_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "tarisland",
    "gameName": "Tarisland",
    "title": "Tarisland",
    "image": "/cs/uploads/202410/phpshkugi_split_tarisland_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "ea-sports-fc",
    "gameName": "EA Sports FC",
    "title": "EA Sports FC",
    "image": "/cs/uploads/202410/phpvernbu_split_ea_fc_all_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "honor-of-kings",
    "gameName": "Honor of Kings",
    "title": "Honor of Kings",
    "image": "/cs/uploads/202410/phpwdcazd_split_honor_of_king_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "maplestory-m",
    "gameName": "MapleStory M",
    "title": "MapleStory M",
    "image": "/cs/uploads/202410/phpzqy4ix_split_maplestorym_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "marvel-rivals",
    "gameName": "Marvel Rivals",
    "title": "Marvel Rivals",
    "image": "/cs/uploads/202412/phpxtb9jl_split_marverl_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "left-4-dead-2",
    "gameName": "Left 4 Dead 2",
    "title": "Left 4 Dead 2",
    "image": "/cs/uploads/202501/phpgufwbu_split_l4d2_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "arma-reforger",
    "gameName": "Arma Reforger",
    "title": "Arma Reforger",
    "image": "/cs/uploads/202502/phpkajsur_split_arma_refor_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "cs-1-6",
    "gameName": "CS 1.6",
    "title": "CS 1.6",
    "image": "/cs/uploads/202502/phpombgvj_split_cs16_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "fragpunk",
    "gameName": "FragPunk",
    "title": "FragPunk",
    "image": "/cs/uploads/202503/phpbemja4_split_fragpunk_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "point-blank",
    "gameName": "Point Blank",
    "title": "Point Blank",
    "image": "/cs/uploads/202503/phpisowsd_split_point_blank_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "path-of-exile-2",
    "gameName": "Path of Exile 2",
    "title": "Path of Exile 2",
    "image": "/cs/uploads/202504/phpimmoeq_split_poe2_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "last-epoch",
    "gameName": "Last Epoch",
    "title": "Last Epoch",
    "image": "/cs/uploads/202504/phpixge6t_split_laste[och_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "8-ball-pool",
    "gameName": "8 Ball Pool",
    "title": "8 Ball Pool",
    "image": "/cs/uploads/202504/phpufuo3j_split_8ball_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "free-fire",
    "gameName": "Free Fire",
    "title": "Free Fire",
    "image": "/cs/uploads/202505/phprp9q7t_split_freefire_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "arc-raiders",
    "gameName": "ARC Raiders",
    "title": "ARC Raiders",
    "image": "/cs/uploads/202505/phpu4fwcl_split_arcraiders_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "etheria-restart",
    "gameName": "Etheria Restart",
    "title": "Etheria Restart",
    "image": "/cs/uploads/202506/php4a5zno_split_etheria_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "foxhole",
    "gameName": "Foxhole",
    "title": "Foxhole",
    "image": "/cs/uploads/202506/phpacfb1w_split_foxhole_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "steel-hunters",
    "gameName": "Steel Hunters",
    "title": "Steel Hunters",
    "image": "/cs/uploads/202506/phpfjza3y_split_steel_hunters_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "rematch",
    "gameName": "Rematch",
    "title": "Rematch",
    "image": "/cs/uploads/202506/phpkadakg_split_rematch_katalog.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "age-of-empires-4",
    "gameName": "Age of Empires IV",
    "title": "Age of Empires IV",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co39tg.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "age-of-mythology-retold",
    "gameName": "Age of Mythology Retold",
    "title": "Age of Mythology Retold",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8zm5.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "albion-online",
    "gameName": "Albion Online",
    "title": "Albion Online",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa2my.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "arena-breakout-infinite",
    "gameName": "ARENA BREAKOUT",
    "title": "ARENA BREAKOUT",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coabe0.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "armored-core-6",
    "gameName": "Armored Core VI",
    "title": "Armored Core VI",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coan1v.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "backrooms-escape-together",
    "gameName": "Backrooms: Escape Together",
    "title": "Backrooms: Escape Together",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8o6i.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "battlebit-remastered",
    "gameName": "BattleBit Remastered",
    "title": "BattleBit Remastered",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6m2s.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "bellwright",
    "gameName": "Bellwright",
    "title": "Bellwright",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coab5l.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "bitcraft-online",
    "gameName": "BitCraft Online",
    "title": "BitCraft Online",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9itd.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "bloodline-champions",
    "gameName": "Bloodline Champions",
    "title": "Bloodline Champions",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2pkx.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "caliber",
    "gameName": "CALIBER",
    "title": "CALIBER",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9531.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "chivalry-2",
    "gameName": "Chivalry 2",
    "title": "Chivalry 2",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2yqh.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "chrono-odyssey",
    "gameName": "Chrono Odyssey",
    "title": "Chrono Odyssey",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa7dc.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "civilization-7",
    "gameName": "Civilization VII",
    "title": "Civilization VII",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa9st.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "cloud-dma",
    "gameName": "CLOUD DMA",
    "title": "CLOUD DMA",
    "image": "https://i.pinimg.com/736x/63/7a/0c/637a0cef79d9f21fc017e432e8f13356.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "combat-master",
    "gameName": "Combat Master",
    "title": "Combat Master",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8vt1.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "content-warning",
    "gameName": "Content Warning",
    "title": "Content Warning",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8086.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "dark-and-darker",
    "gameName": "Dark and Darker",
    "title": "Dark and Darker",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co5byi.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "dauntless",
    "gameName": "Dauntless",
    "title": "Dauntless",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co93as.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "dead-by-daylight",
    "gameName": "DEAD BY DAYLIGHT",
    "title": "DEAD BY DAYLIGHT",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co5zky.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "deadside",
    "gameName": "Deadside",
    "title": "Deadside",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2cg5.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "delta-force",
    "gameName": "DELTA FORCE",
    "title": "DELTA FORCE",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa98y.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "demonologist",
    "gameName": "Demonologist",
    "title": "Demonologist",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6917.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "destiny-2",
    "gameName": "Destiny 2",
    "title": "Destiny 2",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa8q3.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "devour",
    "gameName": "Devour",
    "title": "Devour",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co69f8.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "dota-2",
    "gameName": "DOTA 2",
    "title": "DOTA 2",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6ene.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "dune-awakening",
    "gameName": "DUNE AWAKENING",
    "title": "DUNE AWAKENING",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9xk3.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "enlisted",
    "gameName": "Enlisted",
    "title": "Enlisted",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2q1y.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "enshrouded",
    "gameName": "Enshrouded",
    "title": "Enshrouded",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaavv.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "escape-from-tarkov-arena",
    "gameName": "Escape from Tarkov: Arena",
    "title": "Escape from Tarkov: Arena",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2xlq.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "escape-the-backrooms",
    "gameName": "Escape the Backrooms",
    "title": "Escape the Backrooms",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7hmv.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "eternal-return",
    "gameName": "Eternal Return",
    "title": "Eternal Return",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2b5c.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "exoborne",
    "gameName": "Exoborne",
    "title": "Exoborne",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9dm3.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "farlight-84",
    "gameName": "Farlight 84",
    "title": "Farlight 84",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa9f5.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "final-fantasy-xiv",
    "gameName": "Final Fantasy XIV",
    "title": "Final Fantasy XIV",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2cuw.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "forewarned",
    "gameName": "Forewarned",
    "title": "Forewarned",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4cjo.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "fortnite",
    "gameName": "FORTNITE",
    "title": "FORTNITE",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa8yi.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "genshin-impact",
    "gameName": "GENSHIN IMPACT",
    "title": "GENSHIN IMPACT",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co480t.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "ghost-exile",
    "gameName": "Ghost Exile",
    "title": "Ghost Exile",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co78q2.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "gigantic-rampage-edition",
    "gameName": "Gigantic: Rampage Edition",
    "title": "Gigantic: Rampage Edition",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7sz0.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "grounded",
    "gameName": "Grounded",
    "title": "Grounded",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co5d1l.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "gtfo",
    "gameName": "GTFO",
    "title": "GTFO",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4cnq.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "guild-wars-2",
    "gameName": "Guild Wars 2",
    "title": "Guild Wars 2",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co54tr.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "hell-let-loose",
    "gameName": "Hell Let Loose",
    "title": "Hell Let Loose",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6sqr.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "heroes-of-the-storm",
    "gameName": "Heroes of the Storm",
    "title": "Heroes of the Storm",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9sx0.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "honkai-star-rail",
    "gameName": "HONKAI STAR RAIL",
    "title": "HONKAI STAR RAIL",
    "image": "https://wh-satano.ru/storage/thumbnails/default/qg/yg/cy4eoo0kw0o0co0s4kw0.webp?p=hsr.webp&amp;s=s3",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "hunger",
    "gameName": "HUNGER HUNGER",
    "title": "HUNGER HUNGER",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt3dfHeoHz2Y9uCwmuPKWyt4h8_ioDtahur6iLt2t9uBqfIkplv2Fj0kU&amp;s=10",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "hunt-showdown",
    "gameName": "Hunt: Showdown",
    "title": "Hunt: Showdown",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2ys8.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "hwid-spoofer",
    "gameName": "HWID SPOOFER",
    "title": "HWID SPOOFER",
    "image": "https://wh-satano.ru/storage/thumbnails/default/dk/ix/di0a0740w0wwc88s0ccso.webp?p=hwid-spoofer.webp&amp;s=s3",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "icarus",
    "gameName": "Icarus",
    "title": "Icarus",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6z9h.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "inside-the-backrooms",
    "gameName": "Inside the Backrooms",
    "title": "Inside the Backrooms",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co509a.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "ironsight",
    "gameName": "Ironsight",
    "title": "Ironsight",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co97fg.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "killer-klowns-from-outer-space",
    "gameName": "Killer Klowns From Outer Space: The Game",
    "title": "Killer Klowns From Outer Space: The Game",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co546i.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "labyrinthine",
    "gameName": "Labyrinthine",
    "title": "Labyrinthine",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2i9w.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "league-of-legends",
    "gameName": "League of legends",
    "title": "League of legends",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coabh7.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "lethal-company",
    "gameName": "Lethal Company",
    "title": "Lethal Company",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co5ive.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "life-is-feudal-mmo",
    "gameName": "Life is Feudal MMO",
    "title": "Life is Feudal MMO",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3wev.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "lost-ark",
    "gameName": "Lost Ark",
    "title": "Lost Ark",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4w4j.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "manor-lords",
    "gameName": "Manor Lords",
    "title": "Manor Lords",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8550.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "marauders",
    "gameName": "Marauders",
    "title": "Marauders",
    "image": "https://sm.ign.com/t/ign_ap/gallery/m/marauders-/marauders-beta-screenshots_u7pr.1400.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "minecraft",
    "gameName": "MINECRAFT",
    "title": "MINECRAFT",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co5jeo.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "monster-hunter-rise",
    "gameName": "Monster Hunter Rise",
    "title": "Monster Hunter Rise",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3uzk.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "monster-hunter-wilds",
    "gameName": "Monster Hunter Wilds",
    "title": "Monster Hunter Wilds",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co904o.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "monster-hunter-world",
    "gameName": "Monster Hunter World",
    "title": "Monster Hunter World",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1rst.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "mordhau",
    "gameName": "Mordhau",
    "title": "Mordhau",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1qrx.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "mortal-kombat-1",
    "gameName": "Mortal Kombat 1",
    "title": "Mortal Kombat 1",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9b8f.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "mortal-online-2",
    "gameName": "Mortal Online 2",
    "title": "Mortal Online 2",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co4995.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "murky-divers",
    "gameName": "Murky Divers",
    "title": "Murky Divers",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co89oh.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "naraka-bladepoint",
    "gameName": "NARAKA BLADEPOINT",
    "title": "NARAKA BLADEPOINT",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6qec.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "nba-2k26",
    "gameName": "NBA 2K26",
    "title": "NBA 2K26",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8te0.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "new-world",
    "gameName": "New World",
    "title": "New World",
    "image": "/cs/uploads/202509/new-world-cover.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "nhl-26",
    "gameName": "NHL 26",
    "title": "NHL 26",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8pwh.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "no-more-room-in-hell-2",
    "gameName": "No More Room in Hell 2",
    "title": "No More Room in Hell 2",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8zli.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "northgard",
    "gameName": "Northgard",
    "title": "Northgard",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/guqifzispzew1rubnyzd.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "operation-harsh-doorstop",
    "gameName": "Operation Harsh Doorstop",
    "title": "Operation Harsh Doorstop",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co3qn2.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "overwatch-2",
    "gameName": "OVERWATCH 2",
    "title": "OVERWATCH 2",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co885f.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "pacify",
    "gameName": "Pacify",
    "title": "Pacify",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1j07.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "paladins",
    "gameName": "PALADINS",
    "title": "PALADINS",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1p3u.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "palia",
    "gameName": "Palia",
    "title": "Palia",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaasp.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "palworld",
    "gameName": "Palworld",
    "title": "Palworld",
    "image": "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/library_hero.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "payday-3",
    "gameName": "PAYDAY 3",
    "title": "PAYDAY 3",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6m2i.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "phasmophobia",
    "gameName": "Phasmophobia",
    "title": "Phasmophobia",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2hby.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "planetside-2",
    "gameName": "PlanetSide 2",
    "title": "PlanetSide 2",
    "image": "https://zadeyo.com/null",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "pragmata",
    "gameName": "pragmata",
    "title": "pragmata",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9wwv.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "project-zomboid",
    "gameName": "Project Zomboid",
    "title": "Project Zomboid",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7kod.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "raft",
    "gameName": "Raft",
    "title": "Raft",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1xdc.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "rainbow-six-siege",
    "gameName": "RAINBOW SIX SIEGE",
    "title": "RAINBOW SIX SIEGE",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1z7z.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "ready-or-not",
    "gameName": "Ready or Not",
    "title": "Ready or Not",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2m9w.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "red-dead-redemption",
    "gameName": "RED DEAD REDEMPTION",
    "title": "RED DEAD REDEMPTION",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1q1f.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "redm",
    "gameName": "RedM RP",
    "title": "RedM RP",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1wyy.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "scum",
    "gameName": "SCUM",
    "title": "SCUM",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa05f.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "sea-of-thieves",
    "gameName": "Sea of Thieves",
    "title": "Sea of Thieves",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2558.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "shatterline",
    "gameName": "Shatterline",
    "title": "Shatterline",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co52dh.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "skin-changer",
    "gameName": "Skin Changer",
    "title": "Skin Changer",
    "image": "https://i.postimg.cc/DwM9mLYL/skin-changer.png",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "smite-2",
    "gameName": "SMITE 2",
    "title": "SMITE 2",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7m9c.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "sons-of-the-forest",
    "gameName": "Sons of the Forest",
    "title": "Sons of the Forest",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co67g5.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "soulmask",
    "gameName": "Soulmask",
    "title": "Soulmask",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coakzj.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "splitgate-2",
    "gameName": "Splitgate 2",
    "title": "Splitgate 2",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co95g6.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "squad",
    "gameName": "SQUAD",
    "title": "SQUAD",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co84hg.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "star-wars-zero-company",
    "gameName": "STAR WARS Zero Company™",
    "title": "STAR WARS Zero Company™",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3P1csXP9lbARJ3K31X5D8I4hiesqlxYK7nVDTGouq_VpHyWYbdA5SdVr9lQGir8RSBKDh8Q&amp;s=10",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "state-of-decay-2",
    "gameName": "State of Decay 2",
    "title": "State of Decay 2",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2569.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "stormgate",
    "gameName": "Stormgate",
    "title": "Stormgate",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co8nnz.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "street-fighter-6",
    "gameName": "Street Fighter 6",
    "title": "Street Fighter 6",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9wxo.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "supervive",
    "gameName": "Supervive",
    "title": "Supervive",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coabof.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "tekken-8",
    "gameName": "Tekken 8",
    "title": "Tekken 8",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co7lbb.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "temtem",
    "gameName": "Temtem",
    "title": "Temtem",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1on0.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "texas-chain-saw-massacre",
    "gameName": "Texas Chain Saw Massacre",
    "title": "Texas Chain Saw Massacre",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa10z.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "elder-scrolls-online",
    "gameName": "The Elder Scrolls Online",
    "title": "The Elder Scrolls Online",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9nt3.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "the-front",
    "gameName": "THE FRONT",
    "title": "THE FRONT",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6y3o.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "the-outlast-trials",
    "gameName": "The Outlast Trials",
    "title": "The Outlast Trials",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co29og.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "the-finals",
    "gameName": "THEFINALS",
    "title": "THEFINALS",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coagj6.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "throne-and-liberty",
    "gameName": "Throne and Liberty",
    "title": "Throne and Liberty",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9i5r.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "torchlight-infinite",
    "gameName": "Torchlight Infinite",
    "title": "Torchlight Infinite",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaaw6.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "ugc",
    "gameName": "UGC",
    "title": "UGC",
    "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSOyxZWEgue4_vGXEz86T9sLIh-h2AVXXMVRSb5I1V5c5eP1g7I",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "unturned",
    "gameName": "UNTURNED",
    "title": "UNTURNED",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6115.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "v-rising",
    "gameName": "V Rising",
    "title": "V Rising",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coaavz.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "valheim",
    "gameName": "Valheim",
    "title": "Valheim",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2x61.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "valorant",
    "gameName": "VALORANT",
    "title": "VALORANT",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa7oc.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "vindictus-defying-fate",
    "gameName": "Vindictus: Defying Fate",
    "title": "Vindictus: Defying Fate",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co9oq3.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "vintage-story",
    "gameName": "Vintage Story",
    "title": "Vintage Story",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2j6g.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "war-selection",
    "gameName": "War Selection",
    "title": "War Selection",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co1ufo.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "warframe",
    "gameName": "Warframe",
    "title": "Warframe",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/coa5tt.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "world-of-warcraft",
    "gameName": "World of Warcraft",
    "title": "World of Warcraft",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co2l7z.jpg",
    "gif": null,
    "section": "popular"
  },
  {
    "slug": "world-war-3",
    "gameName": "WORLD WAR 3",
    "title": "WORLD WAR 3",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co5utn.jpg",
    "gif": null,
    "section": "all"
  },
  {
    "slug": "xdefiant",
    "gameName": "XDefiant",
    "title": "XDefiant",
    "image": "https://images.igdb.com/igdb/image/upload/t_cover_big_2x/co6dta.jpg",
    "gif": null,
    "section": "all"
  }
];

const WARZONE_GUIDE: Guide = {
  slug: "warzone",
  gameName: "Call of Duty: Warzone",
  title: "Call of Duty: Warzone",
  image: "/cs/uploads/202510/phpj46zur_split_cod_bo7_katalog.jpg",
  gif: null,
  section: "popular",
};

const FEATURED_GAME_SLUGS = [
  "valorant",
  "warzone",
  "destiny-2",
  "rainbow-six-siege",
  "sea-of-thieves",
] as const;

export const guides: Guide[] = FEATURED_GAME_SLUGS.map((slug) => {
  if (slug === "warzone") return WARZONE_GUIDE;
  const match = ALL_GUIDES.find((guide) => guide.slug === slug);
  if (!match) {
    throw new Error(`Missing featured guide: ${slug}`);
  }
  return match;
}).map((guide) => ({
  ...guide,
  image: getFeaturedGameImage(guide.slug) ?? guide.image,
}));

export interface CatalogItem {
  slug: string;
  title: string;
  image: string;
  gif?: string | null;
  section: "popular" | "all";
}

export const catalogItems: CatalogItem[] = guides.map((guide) => ({
  slug: guide.slug,
  title: guide.title,
  image: guide.image,
  gif: guide.gif,
  section: guide.section,
}));

export function getGameUrl(slug: string): string {
  return `/${slug}`;
}

export function getGuideUrl(slug: string): string {
  return `/${slug}-cheats`;
}

export function getCatalogHref(slug: string, mode: "game" | "cheats"): string {
  return mode === "game" ? getGameUrl(slug) : getGuideUrl(slug);
}

export function getGuideParam(slug: string): string {
  return `${slug}-cheats`;
}

export function parseGuideParam(param: string): string | null {
  if (!param.endsWith("-cheats")) return null;
  return param.slice(0, -"-cheats".length);
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function getGuideByParam(param: string): Guide | undefined {
  const slug = parseGuideParam(param);
  if (!slug) return undefined;
  return getGuide(slug);
}

export function guideMetaTitle(gameName: string): string {
  return `${gameName} Cheats | Aimbot, ESP & Wallhack Guide`;
}

export function gameMetaTitle(gameName: string): string {
  return `${gameName} Guides, Updates & Patches | ${SITE.name}`;
}

export function guideMetaDescription(gameName: string): string {
  return `Compare ${gameName} cheats with aimbot, ESP, wallhack and spoofer options. See features, market alternatives, and buyer notes for ${gameName} cheats.`;
}

export function gameMetaDescription(gameName: string): string {
  return `${gameName} guides, patch notes, player picks, and meta updates — plus a full cheat feature breakdown when you need aimbot, ESP, and spoofer details.`;
}

export function gameKeywords(gameName: string): string {
  return `${gameName} guides, ${gameName} updates, ${gameName} patches, ${gameName} meta, ${gameName} cheats, ${gameName} aimbot, ${gameName} ESP`;
}

export function guideKeywords(gameName: string): string {
  return `${gameName} cheats, ${gameName} aimbot, ${gameName} ESP, ${gameName} wallhack, ${gameName} spoofer, buy ${gameName} cheats, undetected ${gameName} cheats`;
}

export function guideH1(gameName: string): string {
  return `${gameName} Cheats — ${SITE.name}`;
}

export function gameH1(gameName: string): string {
  return `${gameName}`;
}

export function guidePageLead(gameName: string): string {
  return `${gameName} cheat guides with aimbot, ESP, and wallhack comparisons — shop at ${SITE.domainHost}.`;
}

export function gamePageLead(gameName: string): string {
  return `Your ${gameName} hub — patch notes, player trends, loadout picks, and a full cheat breakdown below when you need it.`;
}

export function guideLead(gameName: string): string {
  return `If you run ${gameName}, cheats that show people and loot through walls cut the grind. Below is a straight feature comparison for aimbot, ESP and spoofer builds.`;
}

export const GUIDE_FEATURES = [
  { name: "Aimbot", text: "Configurable FOV, smooth aim, and bone priority for cleaner fights." },
  { name: "ESP / Wallhack", text: "Player boxes, distance, and health readouts through walls." },
  { name: "Loot / world ESP", text: "Highlight valuable loot and world objects where the build supports it." },
  { name: "No recoil helpers", text: "Weapon control assists on supported titles and configs." },
  { name: "Triggerbot", text: "Fire assistance when crosshair meets a valid target." },
  { name: "HWID Spoofer path", text: "Documented spoofer pairing when hardware bans are a risk." },
  { name: "Stream-proof mode", text: "Hide overlays from capture software on supported builds." },
  { name: "Instant delivery", text: "Loader / license access after payment clears — no DM waiting." },
  { name: "Patch updates", text: "Builds tracked against current game patches with status notes." },
  { name: "24/7 support", text: "Contact path for load help instead of abandoned reseller accounts." },
] as const;

export function guideFaqs(gameName: string) {
  return [
    {
      question: `Are ${gameName} cheats undetected?`,
      answer: `Status changes after every ${gameName} patch. We list the current status on the product and update builds when detection hits. Always read the latest note before you inject or load.`,
    },
    {
      question: `What do ${gameName} cheats include?`,
      answer: `Most packs combine aimbot, ESP (player and/or loot) and optional extras like no recoil, triggerbot or a HWID spoofer. The comparison table on this page shows what each tier covers.`,
    },
    {
      question: `How fast is delivery for ${gameName} cheats?`,
      answer: "Delivery is instant after payment. You get load instructions and license access without waiting on a ticket queue.",
    },
    {
      question: `Can I use a spoofer with ${gameName} cheats?`,
      answer: `Yes on builds that ship a built-in spoofer or list HWID support. If you already have a hardware ban on ${gameName}, use a spoofer before the first launch.`,
    },
  ];
}
