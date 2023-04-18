/**
 * These are currently all unused
 */

export type DCG_Army = 'fin' | 'rus' | 'germ';
export type DCG_Alliance = 'allies' | 'axis';
export type DCG_Difficulty = 'normal';
export type DCG_FogOfWarSetting = 'fog_realistic';
export type DCG_ManualControlMode = 3;

export type DCG_MapPoint_Landscape = 'wood';
export type DCG_MapPoint_GameMode = 'campaign_capture_the_flag';
export type DCG_MapPoint_OwnerTeam = 'a';
export type DCG_MapPoint_Risk = 'low' | 'standard';
export type DCG_MapPoint_Reward = 'none' | 'factory' | 'bonus';
export type DCG_MapPoint_TexMod = 'winter';

export type DCG_MapPoint = {
	name: string;
	landscape: DCG_MapPoint_Landscape;
	gamemode: DCG_MapPoint_GameMode;
	ownerTeam: DCG_MapPoint_OwnerTeam;
	adjacentMaps: string[];
	risk: DCG_MapPoint_Risk;
	reward: DCG_MapPoint_Reward;
	texmod?: DCG_MapPoint_TexMod;
	nextEnemyArmy?: DCG_Army;
	map?: string;
};

export type DCG_History = {
	mappointname: string;
	result: number;
};

export type SaveStatus = {
	version: number;
	gameVersion: string;
	mods: string[];
	// money points
	mp: number;
	// special points
	sp: number;
	// research points
	rp: number;
	// ammo points
	ap: number;
	seed: number;
	name: string;
	army: DCG_Army;
	ownAlliance: DCG_Alliance;
	enemyAlliance: DCG_Alliance;
	difficulty: DCG_Difficulty;
	duration: number;
	resources: number;
	fogofwar: DCG_FogOfWarSetting;
	manualControlMode: DCG_ManualControlMode;
	selectedMapPoint: string;
	unlockedResearch: string[];
	mapPoints: DCG_MapPoint[];
	attacking: boolean;
	history: DCG_History[];
};

export type CampaignEntity = string;
export type CampaignHuman = string;
export type CampaignTag = string;
export type CampaignInventory = string;
export type CampaignSlicer = string;
export type CampaignSquads = string;

export type CampaignEntry =
	| CampaignEntity
	| CampaignHuman
	| CampaignTag
	| CampaignInventory
	| CampaignSlicer
	| CampaignSquads;

export type Save = {
	status: SaveStatus;
	campaign: CampaignEntry[];
};
