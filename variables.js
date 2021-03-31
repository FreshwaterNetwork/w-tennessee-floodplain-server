define([
	"dojo/_base/declare"
],
function ( 	declare ) {
        "use strict";
        return declare(null, {
			makeVariables: function(t){	
				// build top level controls
				t.topObj = {
					introP: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
					toggleBtns:{
						tb1:{
							header:"Select Flood Frequency",
							name:"floodFreq",
							btns:{
								b1:{
									id:"ff-1",
									value:"1",
									label:"1-in-5-year"
								},
								b2:{
									id:"ff-2",
									value:"2",
									label:"1-in-100-year"
								},
								b3:{
									id:"ff-3",
									value:"3",
									label:"1-in-500-year"
								}
							}	
						},
						tb2:{
							header:"View Floodplains By Watershed",
							name:"huc",
							btns:{
								b1:{
									id:"-h12",
									value:"0",
									label:"HUC-12"
								},
								b2:{
									id:"-catch",
									value:"1",
									label:"Catchment"
								}
							}
						},
						tb3:{
							header:"Select Management Action",
							name:"mngmtAction",
							btns:{
								b1:{
									id:"mact-1",
									value:"p",
									label:"Protection"
								},
								b2:{
									id:"mact-2",
									value:"r",
									label:"Restoration"
								}
							}
						}
					}
				}
				// object to build filter controls
				t.filterObj = {
					group0:{
						header: "Available Floodplain Area",
						controls:{
							con0:{
								type:"slider",
								field:"Acres",
								label:"Available floodplain area for given return interval and management action",
								single:true
							}	
						}
					},
					group1:{
						header: "Water Quality",
						controls:{
							con0:{
								type:"slider",
								field:"TN",
								label:"Total nitrogen (SWAT model)"
							},
							con1:{
								type:"slider",
								field:"TP",
								label:"Total phosphorus (SWAT model)"
							},
							con2:{
								type:"slider",
								field:"Sed",
								label:"Sediment (SWAT model)"
							},
							con3:{
								type:"slider",
								field:"SedAcc",
								label:"Accumulated sediment (SWAT model)"
							},
							con4:{
								type:"slider",
								field:"DINCY",
								label:"Nutrient loading to Gulf of Mexico (SPARROW model)"
							}
						}
					},
					group2:{
						header:"Land Conversion",
						controls:{
							con0:{
								type:"slider",
								field:"NCCPI",
								label:"Agricultural productivity potential of soils",
								single:true
							}
						}
					},
					group3:{
						header:"Connectivity",
						controls:{
							con0:{
								type:"radio",
								field:"impWet",
								label:"Floodplain Wetland Importance Rank"
							},
							con1:{
								type:"radio",
								field:"fprank",
								label:"Floodplain Restoration Rank"
							}
						}
					},
					group4:{
						header:"Priority Conservation Area/Natural Areas",
						controls:{
							con0:{
								type:"slider",
								field:"adjProt",
								label:"Public Lands Adjacency"
							},
							con1:{
								type:"slider",
								field:"EcoSig",
								label:"Ecological Significance Ranking"
							}
						}		
					},
					group5:{
						header:"Habitat",
						controls:{
							con0:{
								type:"radio",
								field:"inIBA",
								label:"Important Bird Areas"
							},
							con1:{
								type:"slider",
								field:"WT_TOT",
								label:"At-Risk Wetland Species"
							},
							con2:{
								type:"radio",
								field:"ABCcorr",
								label:"American Bird Conservancy Corridors & Key Habitat Bird Areas"
							},
							con3:{
								type:"radio",
								field:"anyHab",
								label:"In any of the above 3 Habitat layers"
							},
							con4:{
								type:"slider",
								field:"cumu_hci",
								label:"National Fish Habitat Partnership Cumulative Habitat Condition Index"
							},
							con5:{
								type:"slider",
								field:"HPFedEnd",
								label:"Number of federally endangered species"
							}
						}
					}
				}

				// definition expression root field names
				t.Acres = "";
				t.TN = "";
				t.TP = "";
				t.Sed = "";
				t.SedAcc = "";
				t.DINCY = "";
				t.impWet = "";
				t.NCCPI = "";
				t.fprank = "";
				t.adjProt = "";
				t.EcoSig = "";
				t.inIBA = "";
				t.WT_TOT = "";
				t.ABCcorr = "";
				t.anyHab = "";
				t.cumu_hci = "";
				t.HPFedEnd = "";
				t.popnow = "";
				t.pop2050 = "";
				t.Dam2050 = "";
				// object for range slider
				t.sliderObj = {
					// huc 12 + protection + 1 in 5 year flood
					h12p1:{
						Acres:{
							values:[],vis:true,min:17,max:806,
							info:"<b>Available floodplain area for given return interval and management action</b><br>Area of floodplain in natural land cover that is not currently in protected status."
						}, 
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},	
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						NCCPI:{
							vis:false
						},
						adjProt:{
							values:[],vis:true,min:0,max:194,
							info:"<b>Public Lands Adjacency</b><br>Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:766,
							info:"<b>Ecological Significance Ranking</b><br>Data provided by the East-West Gateway Council of Governments."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act."
						},
						cumu_hci:{
							values:[],vis:true,min:1,max:4,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric."
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:37,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in forest/wetland floodplain of the selected return interval."
						},
						pop2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland floodplain of the selected return interval in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Economic asset exposure (2050) (Moderate population growth)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						}
					},
					// huc 12 + protection + 1 in 100 year flood
					h12p2:{
						Acres:{
							values:[],vis:true,min:153,max:3044,
							info:"<b>Available floodplain area for given return interval and management action</b><br>Area of floodplain in natural land cover that is not currently in protected status."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						NCCPI:{
							vis:false
						},
						adjProt:{
							values:[],vis:true,min:0,max:870,
							info:"<b>Public Lands Adjacency</b><br>Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:137,max:2541,
							info:"<b>Ecological Significance Ranking</b><br>Data provided by the East-West Gateway Council of Governments."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act."
						},
						cumu_hci:{
							values:[],vis:true,min:1,max:4,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric."
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:37,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in forest/wetland floodplain of the selected return interval."
						},
						pop2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland floodplain of the selected return interval in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Economic asset exposure (2050) (Moderate population growth)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						}
					},
					// huc 12 + protection + 1 in 500 year flood
					h12p3:{
						Acres:{
							values:[],vis:true,min:282,max:4901,
							info:"<b>Available floodplain area for given return interval and management action</b><br>Area of floodplain in natural land cover that is not currently in protected status."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						NCCPI:{
							vis:false
						},
						adjProt:{
							values:[],vis:true,min:0,max:1148,
							info:"<b>Public Lands Adjacency</b><br>Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:239,max:4062,
							info:"<b>Ecological Significance Ranking</b><br>Data provided by the East-West Gateway Council of Governments."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act."
						},
						cumu_hci:{
							values:[],vis:true,min:1,max:4,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric."
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:37,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in forest/wetland floodplain of the selected return interval."
						},
						pop2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland floodplain of the selected return interval in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Economic asset exposure (2050) (Moderate population growth)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						}
					},

					// huc 12 + restoration + 1 in 5 year flood
					h12r1:{
						Acres:{
							values:[],vis:true,min:1,max:482,
							info:"<b>Available floodplain area for given return interval and management action</b><br>Area of floodplain in ag or potentially grazed land that could potentially be restored."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						NCCPI:{
							values:[],vis:true,min:0,max:10,div:10,
							info:"<b>Agricultural productivity potential of soils</b>The National Commodity Crop Productivity Index -- an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration.<br>"
						},
						adjProt:{
							values:[],vis:true,min:0,max:68,
							info:"<b>Public Lands Adjacency</b><br>Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:16,
							info:"<b>Ecological Significance Ranking</b><br>Data provided by the East-West Gateway Council of Governments."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act."
						},
						cumu_hci:{
							values:[],vis:true,min:1,max:4,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric."
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:37,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in ag/pasture floodplain of the selected return interval."
						},
						pop2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland floodplain of the selected return interval in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Economic asset exposure (2050) (Moderate population growth)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						}
					},
					// huc 12 + restoration + 1 in 100 year flood
					h12r2:{
						Acres:{
							values:[],vis:true,min:67,max:2577,
							info:"<b>Available floodplain area for given return interval and management action</b><br>Area of floodplain in ag or potentially grazed land that could potentially be restored."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						NCCPI:{
							values:[],vis:true,min:0,max:10,div:10,
							info:"<b>Agricultural productivity potential of soils</b>The National Commodity Crop Productivity Index -- an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration.<br>"
						},
						adjProt:{
							values:[],vis:true,min:0,max:376,
							info:"<b>Public Lands Adjacency</b><br>Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:73,
							info:"<b>Ecological Significance Ranking</b><br>Data provided by the East-West Gateway Council of Governments."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act."
						},
						cumu_hci:{
							values:[],vis:true,min:1,max:4,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric."
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:37,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in ag/pasture floodplain of the selected return interval."
						},
						pop2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in ag/pasture floodplain of the selected return interval in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Economic asset exposure (2050) (Moderate population growth)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						}
					},
					// huc 12 + restoration + 1 in 500 year flood
					h12r3:{
						Acres:{
							values:[],vis:true,min:107,max:3122,
							info:"<b>Available floodplain area for given return interval and management action</b><br>Area of floodplain in ag or potentially grazed land that could potentially be restored."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						NCCPI:{
							values:[],vis:true,min:0,max:10,div:10,
							info:"<b>Agricultural productivity potential of soils</b>The National Commodity Crop Productivity Index -- an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration.<br>"
						},
						adjProt:{
							values:[],vis:true,min:0,max:456,
							info:"<b>Public Lands Adjacency</b><br>Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:284,
							info:"<b>Ecological Significance Ranking</b><br>Data provided by the East-West Gateway Council of Governments."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act."
						},
						cumu_hci:{
							values:[],vis:true,min:1,max:4,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric."
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:37,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in ag/pasture floodplain of the selected return interval."
						},
						pop2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in ag/pasture floodplain of the selected return interval in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Economic asset exposure (2050) (Moderate population growth)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						}
					},

					// catchment + protection + 1 in 5 year flood
					catchp1:{
						Acres:{
							values:[],vis:true,min:0,max:295,
							info:"<b>Available floodplain area for given return interval and management action</b><br>Area of floodplain in natural land cover that is not currently in protected status."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric.<br>"
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						NCCPI:{
							vis:false
						},
						adjProt:{
							values:[],vis:true,min:0,max:112,
							info:"<b>Public Lands Adjacency</b><br>Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:294,
							info:"<b>Ecological Significance Ranking</b><br>Data provided by the East-West Gateway Council of Governments."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act."
						},
						cumu_hci:{
							values:[],vis:true,min:0,max:5,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric."
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:9,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in forest/wetland floodplain of the selected return interval."
						},
						pop2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland floodplain of the selected return interval in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Economic asset exposure (2050) (Moderate population growth)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						}
					},
					// catchment + protection + 1 in 100 year flood
					catchp2:{
						Acres:{
							values:[],vis:true,min:0,max:504,
							info:"<b>Available floodplain area for given return interval and management action</b><br>Area of floodplain in natural land cover that is not currently in protected status."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						NCCPI:{
							vis:false
						},
						adjProt:{
							values:[],vis:true,min:0,max:248,
							info:"<b>Public Lands Adjacency</b><br>Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:500,
							info:"<b>Ecological Significance Ranking</b><br>Data provided by the East-West Gateway Council of Governments."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act."
						},
						cumu_hci:{
							values:[],vis:true,min:0,max:5,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric."
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:9,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in forest/wetland floodplain of the selected return interval."
						},
						pop2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland floodplain of the selected return interval in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Economic asset exposure (2050) (Moderate population growth)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						}
					},
					// catchment + protection + 1 in 500 year flood
					catchp3:{
						Acres:{
							values:[],vis:true,min:0,max:576,
							info:"<b>Available floodplain area for given return interval and management action</b><br>Area of floodplain in natural land cover that is not currently in protected status."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						NCCPI:{
							vis:false
						},
						adjProt:{
							values:[],vis:true,min:0,max:266,
							info:"<b>Public Lands Adjacency</b><br>Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:569,
							info:"<b>Ecological Significance Ranking</b><br>Data provided by the East-West Gateway Council of Governments."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act."
						},
						cumu_hci:{
							values:[],vis:true,min:0,max:5,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric."
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:9,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in forest/wetland floodplain of the selected return interval."
						},
						pop2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland floodplain of the selected return interval in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Economic asset exposure (2050) (Moderate population growth)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						}
					},
					// catchment + restoration + 1 in 5 year flood
					catchr1:{
						Acres:{
							values:[],vis:true,min:0,max:123,
							info:"<b>Available floodplain area for given return interval and management action</b><br>Area of floodplain in ag or potentially grazed land that could potentially be restored."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						NCCPI:{
							values:[],vis:true,min:0,max:10,div:10,
							info:"<b>Agricultural productivity potential of soils</b>The National Commodity Crop Productivity Index -- an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration.<br>"
						},
						adjProt:{
							values:[],vis:true,min:0,max:32,
							info:"<b>Public Lands Adjacency</b><br>Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:10,
							info:"<b>Ecological Significance Ranking</b><br>Data provided by the East-West Gateway Council of Governments."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act."
						},
						cumu_hci:{
							values:[],vis:true,min:0,max:5,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric."
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:9,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in ag/pasture floodplain of the selected return interval."
						},
						pop2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in ag/pasture floodplain of the selected return interval in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Economic asset exposure (2050) (Moderate population growth)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						} 
					},
					// catchment + restoration + 1 in 100 year flood
					catchr2:{
						Acres:{
							values:[],vis:true,min:0,max:453,
							info:"<b>Available floodplain area for given return interval and management action</b><br>Area of floodplain in ag or potentially grazed land that could potentially be restored."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						NCCPI:{
							values:[],vis:true,min:0,max:10,div:10,
							info:"<b>Agricultural productivity potential of soils</b>The National Commodity Crop Productivity Index -- an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration.<br>"
						},
						adjProt:{
							values:[],vis:true,min:0,max:121,
							info:"<b>Public Lands Adjacency</b><br>Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:33,
							info:"<b>Ecological Significance Ranking</b><br>Data provided by the East-West Gateway Council of Governments."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act."
						},
						cumu_hci:{
							values:[],vis:true,min:0,max:5,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric."
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:9,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in ag/pasture floodplain of the selected return interval."
						},
						pop2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in ag/pasture floodplain of the selected return interval in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Economic asset exposure (2050) (Moderate population growth)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						}
					},
					// catchment + restoration + 1 in 500 year flood
					catchr3:{
						Acres:{
							values:[],vis:true,min:0,max:729,
							info:"<b>Available floodplain area for given return interval and management action</b><br>Area of floodplain in ag or potentially grazed land that could potentially be restored."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>higher</i> in this metric."
						},
						NCCPI:{
							values:[],vis:true,min:0,max:10,div:10,
							info:"<b>Agricultural productivity potential of soils</b>The National Commodity Crop Productivity Index -- an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration.<br>"
						},
						adjProt:{
							values:[],vis:true,min:0,max:137,
							info:"<b>Public Lands Adjacency</b><br>Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:96,
							info:"<b>Ecological Significance Ranking</b><br>Data provided by the East-West Gateway Council of Governments."
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act."
						},
						cumu_hci:{
							values:[],vis:true,min:0,max:5,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric."
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:9,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in ag/pasture floodplain of the selected return interval."
						},
						pop2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in ag/pasture floodplain of the selected return interval in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Economic asset exposure (2050) (Moderate population growth)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						}
					}
				}

				// object for radio groups
				t.radioObj = {
					// huc 12 + protection + 1 in 5 year flood
					h12p1:{
						impWet:{
							vis:true,cbid:"rb_cb0",
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						fprank:{
							vis:false
						},
						inIBA:{
							vis:true,cbid:"rb_cb2",
							info:"<b>Important Bird Areas</b></br>Floodplain in a state Important Bird Area."
						},
						ABCcorr:{
							vis:true,cbid:"rb_cb3",shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>Corridors represent where bird risk differs season to season and key habitat areas are for birds on the Red WatchList."
						},
						anyHab:{
							vis:true,cbid:"rb_cb4",
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// huc 12 + protection + 1 in 100 year flood
					h12p2:{
						impWet:{
							vis:true,cbid:"rb_cb0",
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						fprank:{
							vis:false
						},
						inIBA:{
							vis:true,cbid:"rb_cb2",
							info:"<b>Important Bird Areas</b></br>Floodplain in a state Important Bird Area."
						},
						ABCcorr:{
							vis:true,cbid:"rb_cb3",shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>Corridors represent where bird risk differs season to season and key habitat areas are for birds on the Red WatchList."
						},
						anyHab:{
							vis:true,cbid:"rb_cb4",
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// huc 12 + protection + 1 in 500 year flood
					h12p3:{
						impWet:{
							vis:true,cbid:"rb_cb0",
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						fprank:{
							vis:false
						},
						inIBA:{
							vis:true,cbid:"rb_cb2",
							info:"<b>Important Bird Areas</b></br>Floodplain in a state Important Bird Area."
						},
						ABCcorr:{
							vis:true,cbid:"rb_cb3",shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>Corridors represent where bird risk differs season to season and key habitat areas are for birds on the Red WatchList."
						},
						anyHab:{
							vis:true,cbid:"rb_cb4",
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}	
					},
					// huc 12 + restoration + 1 in 5 year flood
					h12r1:{
						impWet:{
							vis:true,cbid:"rb_cb0",
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						fprank:{
							vis:true,cbid:"rb_cb1",
							info:"<b>Floodplain Restoration Rank</b><br>Watershed contains floodplain in an area of floodplain restoration rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						inIBA:{
							vis:true,cbid:"rb_cb2",
							info:"<b>Important Bird Areas</b></br>Floodplain in a state Important Bird Area."
						},
						ABCcorr:{
							vis:true,cbid:"rb_cb3",shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>Corridors represent where bird risk differs season to season and key habitat areas are for birds on the Red WatchList."
						},
						anyHab:{
							vis:true,cbid:"rb_cb4",
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// huc 12 + restoration + 1 in 100 year flood
					h12r2:{
						impWet:{
							vis:true,cbid:"rb_cb0",
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						fprank:{
							vis:true,cbid:"rb_cb1",
							info:"<b>Floodplain Restoration Rank</b><br>Watershed contains floodplain in an area of floodplain restoration rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						inIBA:{
							vis:true,cbid:"rb_cb2",
							info:"<b>Important Bird Areas</b></br>Floodplain in a state Important Bird Area."
						},
						ABCcorr:{
							vis:true,cbid:"rb_cb3",shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>Corridors represent where bird risk differs season to season and key habitat areas are for birds on the Red WatchList."
						},
						anyHab:{
							vis:true,cbid:"rb_cb4",
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// huc 12 + restoration + 1 in 500 year flood
					h12r3:{
						impWet:{
							vis:true,cbid:"rb_cb0",
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						fprank:{
							vis:true,cbid:"rb_cb1",
							info:"<b>Floodplain Restoration Rank</b><br>Watershed contains floodplain in an area of floodplain restoration rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						inIBA:{
							vis:true,cbid:"rb_cb2",
							info:"<b>Important Bird Areas</b></br>Floodplain in a state Important Bird Area."
						},
						ABCcorr:{
							vis:true,cbid:"rb_cb3",shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>Corridors represent where bird risk differs season to season and key habitat areas are for birds on the Red WatchList."
						},
						anyHab:{
							vis:true,cbid:"rb_cb4",
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// catchment + protection + 1 in 5 year flood
					catchp1:{
						impWet:{
							vis:true,cbid:"rb_cb0",
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						fprank:{
							vis:false
						},
						inIBA:{
							vis:true,cbid:"rb_cb2",
							info:"<b>Important Bird Areas</b></br>Floodplain in a state Important Bird Area."
						},
						ABCcorr:{
							vis:true,cbid:"rb_cb3",shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>Corridors represent where bird risk differs season to season and key habitat areas are for birds on the Red WatchList."
						},
						anyHab:{
							vis:true,cbid:"rb_cb4",
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// catchment + protection + 1 in 100 year flood
					catchp2:{
						impWet:{
							vis:true,cbid:"rb_cb0",
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						fprank:{
							vis:false
						},
						inIBA:{
							vis:true,cbid:"rb_cb2",
							info:"<b>Important Bird Areas</b></br>Floodplain in a state Important Bird Area."
						},
						ABCcorr:{
							vis:true,cbid:"rb_cb3",shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>Corridors represent where bird risk differs season to season and key habitat areas are for birds on the Red WatchList."
						},
						anyHab:{
							vis:true,cbid:"rb_cb4",
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// catchment + protection + 1 in 500 year flood
					catchp3:{
						impWet:{
							vis:true,cbid:"rb_cb0",
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						fprank:{
							vis:false
						},
						inIBA:{
							vis:true,cbid:"rb_cb2",
							info:"<b>Important Bird Areas</b></br>Floodplain in a state Important Bird Area."
						},
						ABCcorr:{
							vis:true,cbid:"rb_cb3",shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>Corridors represent where bird risk differs season to season and key habitat areas are for birds on the Red WatchList."
						},
						anyHab:{
							vis:true,cbid:"rb_cb4",
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// catchment + restoration + 1 in 5 year flood
					catchr1:{
						impWet:{
							vis:true,cbid:"rb_cb0",
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						fprank:{
							vis:true,cbid:"rb_cb1",
							info:"<b>Floodplain Restoration Rank</b><br>Watershed contains floodplain in an area of floodplain restoration rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						inIBA:{
							vis:true,cbid:"rb_cb2",
							info:"<b>Important Bird Areas</b></br>Floodplain in a state Important Bird Area."
						},
						ABCcorr:{
							vis:true,cbid:"rb_cb3",shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>Corridors represent where bird risk differs season to season and key habitat areas are for birds on the Red WatchList."
						},
						anyHab:{
							vis:true,cbid:"rb_cb4",
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// catchment + restoration + 1 in 100 year flood
					catchr2:{
						impWet:{
							vis:true,cbid:"rb_cb0",
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						fprank:{
							vis:true,cbid:"rb_cb1",
							info:"<b>Floodplain Restoration Rank</b><br>Watershed contains floodplain in an area of floodplain restoration rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						inIBA:{
							vis:true,cbid:"rb_cb2",
							info:"<b>Important Bird Areas</b></br>Floodplain in a state Important Bird Area."
						},
						ABCcorr:{
							vis:true,cbid:"rb_cb3",shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>Corridors represent where bird risk differs season to season and key habitat areas are for birds on the Red WatchList."
						},
						anyHab:{
							vis:true,cbid:"rb_cb4",
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// catchment + restoration + 1 in 500 year flood
					catchr3:{
						impWet:{
							vis:true,cbid:"rb_cb0",
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						fprank:{
							vis:true,cbid:"rb_cb1",
							info:"<b>Floodplain Restoration Rank</b><br>Watershed contains floodplain in an area of floodplain restoration rank 5 or above. Data provided by the East-West Gateway Council of Governments."
						},
						inIBA:{
							vis:true,cbid:"rb_cb2",
							info:"<b>Important Bird Areas</b></br>Floodplain in a state Important Bird Area."
						},
						ABCcorr:{
							vis:true,cbid:"rb_cb3",shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>Corridors represent where bird risk differs season to season and key habitat areas are for birds on the Red WatchList."
						},
						anyHab:{
							vis:true,cbid:"rb_cb4",
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					}
				}
				// javascript way to loop through the object and get keys and values
				// const runloop = () => {
				// 	for (const key of Object.keys(t.sliderObj)){
				// 		if (key == "h8p2"){
				// 			for (const key1 of Object.keys(t.sliderObj[key])){
				// 				console.log(key1, t.sliderObj[key][key1])
				// 			}
				// 		}
				// 	}
				// }
				//runloop();
				//const x = document.getElementsByClassName("toggle-btn")
				// x.forEach(function(vx,ix,y){
				// 	console.log(vx,ix,y)
				// })
				//for (const y in x){
				//	console.log(y)
				//}	
			}
		});
    }
);