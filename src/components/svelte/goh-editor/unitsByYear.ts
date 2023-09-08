import type { UnitByYear } from './types';

export const fin: UnitByYear[] = [
	/**
	 * Special
	 */
	// officer call ins
	{
		kind: 'special',
		doctrines: ['default'],
		unit: 'conquest_blenheim',
		introduced: 1937,
		retired: 1946,
	},
	// defence levels
	{
		kind: 'special',
		doctrines: ['default'],
		unit: 'defense_level_1',
		introduced: 1940,
		retired: 1946,
	},
	{
		kind: 'special',
		doctrines: ['default'],
		unit: 'defense_level_2',
		introduced: 1941,
		retired: 1946,
	},
	{
		kind: 'special',
		doctrines: ['default'],
		unit: 'defense_level_3',
		introduced: 1943,
		retired: 1946,
	},
	// reinforcements
	{
		kind: 'special',
		doctrines: ['default'],
		unit: 'reinforcement_stage_2',
		introduced: 1940,
		retired: 1946,
	},
	{
		kind: 'special',
		doctrines: ['default'],
		unit: 'reinforcement_stage_3',
		introduced: 1941,
		retired: 1946,
	},
	{
		kind: 'special',
		doctrines: ['default'],
		unit: 'reinforcement_stage_4',
		introduced: 1942,
		retired: 1946,
	},
	{
		kind: 'special',
		doctrines: ['default'],
		unit: 'reinforcement_stage_5',
		introduced: 1943,
		retired: 1946,
	},

	/**
	 * Command Inf Squads
	 */
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'single_officer(fin)',
		introduced: 0,
		retired: 1946,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'team_officer_con(fin)',
		introduced: 0,
		retired: 1946,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_officer_con(fin)',
		introduced: 0,
		retired: 1946,
	},

	/**
	 * Utility Inf Squads
	 */
	// miners
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'single_ap_miner(fin)',
		introduced: 0,
		retired: 1946,
		probability: 5,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'single_at_miner(fin)',
		introduced: 0,
		retired: 1946,
		probability: 5,
	},
	// engineers
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'single_engineer(fin)',
		introduced: 0,
		retired: 1946,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_heavy_engineer_mid_con(fin)',
		introduced: 0,
		retired: 1946,
		probability: 10,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_engineer_mid_con(fin)',
		introduced: 1942, // not accurate, guessed
		retired: 1946,
	},
	// misc
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'single_flamer(fin)',
		introduced: 0,
		retired: 1946,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'single_sniper(fin)',
		introduced: 0,
		retired: 1946,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'white_death_con(fin)',
		introduced: 1939,
		retired: 1946,
		probability: 5,
	},

	/**
	 * AT Inf Squads
	 */
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'single_at(fin)',
		introduced: 0,
		retired: 1946,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'single_at_pzs_late_con(fin)',
		introduced: 1943,
		retired: 1946,
		probability: 10,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_at_late_con(fin)',
		introduced: 1942, // not accurate, guessed
		retired: 1946,
	},

	/**
	 * Inf Squads (early)
	 */
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_rifle_early_con(fin)',
		introduced: 0,
		retired: 1941, // not accurate, guessed
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_rifle_lmg_early_con(fin)',
		introduced: 0,
		retired: 1941, // not accurate, guessed
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_civil_guard_early_con(fin)',
		introduced: 0,
		retired: 1941, // not accurate, guessed
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_border_guard_early_con(fin)',
		introduced: 0,
		retired: 1941, // not accurate, guessed
	},

	/**
	 * Inf Squads (midwar)
	 */
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_rifle_mid_con(fin)',
		introduced: 1942, // not accurate, guessed
		retired: 1946,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_reserves_mid_con(fin)',
		introduced: 1942, // not accurate, guessed
		retired: 1946,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_scout_mid_con(fin)',
		introduced: 1942, // not accurate, guessed
		retired: 1946,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_assault_mid_con(fin)',
		introduced: 1942, // not accurate, guessed
		retired: 1946,
		probability: 2,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_cav_mid_con(fin)',
		introduced: 1942, // not accurate, guessed
		retired: 1946,
		probability: 2,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_marksmen_mid_con(fin)',
		introduced: 1942, // not accurate, guessed
		retired: 1946,
		probability: 3,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_jag_mid_con(fin)',
		introduced: 1942, // not accurate, guessed
		retired: 1946,
		probability: 5,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_border_jag_mid_con(fin)',
		introduced: 1942, // not accurate, guessed
		retired: 1946,
		probability: 7,
	},
	{
		kind: 'inf',
		doctrines: ['default'],
		unit: 'squad_sissi_mid_con(fin)',
		introduced: 1942, // not accurate, guessed
		retired: 1946,
		probability: 10,
	},

	/**
	 * Inf Squads (latewar)
	 */
	// (none)

	/**
	 * Utility Misc
	 */
	{
		kind: 'utility',
		doctrines: ['default'],
		unit: 'inf_crate_fin',
		introduced: 0,
		retired: 1946,
	},
	{
		kind: 'utility',
		doctrines: ['default'],
		unit: 'panzernest_krab',
		introduced: 1940,
		retired: 1946,
	},

	/**
	 * Emplacements
	 */
	// artillary + field guns
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '75mm_k40',
		introduced: 1940,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '75mm_k44',
		introduced: 1944,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '76mm_k02',
		introduced: 1902,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '76mm_k02_30_40',
		introduced: 1930,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '76mm_m1927_fin',
		introduced: 1927,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '76mm_k36',
		introduced: 1936,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '84mm_k18',
		introduced: 1871,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '84mm_k18_late',
		introduced: 1918,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '105mm_h33',
		introduced: 1933,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '105mm_k34',
		introduced: 1934,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '105mm_k13',
		introduced: 1916,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '107mm_k10',
		introduced: 1910,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '120mm_k78_31',
		introduced: 1931,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '122mm_m1910_fin',
		introduced: 1910,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '150mm_h40',
		introduced: 1933,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '150mm_sw34',
		introduced: 1936,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '155mm_h17',
		introduced: 1917,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '203mm_h17',
		introduced: 1931,
		retired: 1946,
	},
	// machine gun stand
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: 'maxim_m1910_30',
		introduced: 1910,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: 'ds39_stand_fin',
		introduced: 1939,
		retired: 1946,
	},
	// anti-tank gun
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '20mm_l39',
		introduced: 1939,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '37mm_pstk36',
		introduced: 1936,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '45mm_pstk32',
		introduced: 1932,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '47mm_pstk39',
		introduced: 1937,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '50mm_pstk38',
		introduced: 1939,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '75mm_pstk9738',
		introduced: 1941,
		retired: 1946,
	},
	// rockets
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '150mm_rkh41',
		introduced: 1940,
		retired: 1946,
		probability: 3,
	},
	// mortars
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '50mm_krh38',
		introduced: 1938,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '81mm_krh36',
		introduced: 1936,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '120mm_krh40',
		introduced: 1940,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '170mm_minewerfer',
		introduced: 1913,
		retired: 1946,
	},
	// anti air
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '20mm_itk35', // single 20 auto
		introduced: 1935,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '20mm_itk40', // twin 20 auto
		introduced: 1940,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '40mm_itk38b', // 40 auto
		introduced: 1932,
		retired: 1946,
	},
	{
		kind: 'emplacement',
		doctrines: ['default'],
		unit: '75mm_itk37', // 75mm AA gun
		introduced: 1937,
		retired: 1946,
	},

	/**
	 * Vehicles (utililty)
	 */
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'ford_v3000',
		introduced: 1940,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'ford_v3000_ammo',
		introduced: 1940,
		retired: 1946,
		probability: 2,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'ford_3ton_breda',
		introduced: 1940,
		retired: 1946,
		probability: 2,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'ford_v3000_eng',
		introduced: 1940,
		retired: 1946,
		probability: 3,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'ford_v3000_fuel',
		introduced: 1940,
		retired: 1946,
		probability: 3,
	},

	/**
	 * Vehicles (combat)
	 */
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'l182', // 20mm ba-like
		introduced: 1932,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'l62', // landwerk AA
		introduced: 1938,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'ft17_fin',
		introduced: 1917,
		retired: 1940,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'ft17_mg_fin',
		introduced: 1917,
		retired: 1940,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'vickers_6t_altb',
		introduced: 1930,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'bt5_fin',
		introduced: 1933,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 't26_33_fin',
		introduced: 1933,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 't26e',
		introduced: 1933,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'kht130_fin',
		introduced: 1933,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 't20_fin',
		introduced: 1937,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'ba10_fin',
		introduced: 1937,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 't28_38_fin',
		introduced: 1938,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 't37a_fin',
		introduced: 1938,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'kv1_40e_fin',
		introduced: 1940,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 't50_fin',
		introduced: 1940,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 't3476_41_fin',
		introduced: 1940,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 't3485_44_fin',
		introduced: 1941,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'kv1_42_fin',
		introduced: 1942,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'stug3g_fin',
		introduced: 1942,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'isu152_fin',
		introduced: 1943,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'bt42',
		introduced: 1943,
		retired: 1946,
	},
	{
		kind: 'vehicle',
		doctrines: ['default'],
		unit: 'panzer4j_fin',
		introduced: 1944,
		retired: 1946,
	},
];
