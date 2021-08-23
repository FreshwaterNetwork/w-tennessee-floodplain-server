var search = window.location.search;
// check for save and share data in URL
if (search){
	let searchslice = search.slice(8);
	let so = JSON.parse(decodeURIComponent(searchslice))
	app.obj = JSON.parse(so)
	console.log(app.obj)
}else{
	// if no save and share, use obj.json file
	fetch("obj.json")
		.then(response => {
   			return response.json();
		})
		.then(data => {
			app.obj = data;
		})
}
// build top level controls
app.topObj = {
	introP: 'This floodplain prioritization tool is designed to identify critical opportunities for floodplain protection in Western Tennessee. Use the selector widgets below to specify criteria related to water quality, wildlife habitat, and human exposure to flood risk. The map on the right will change in response to your selections to identify sites meeting these criteria, identifying those geographies where floodplain conservation is likely to have the greatest positive impact on the health of this river system.<br><br>This tool uses the Fathom-US 2.0 floodplain data, the most comprehensive view of flood hazard across the United States. To learn more about this dataset, visit <a href="https://www.fathom.global/fathom-us" target="_blank">here</a> and <a href="https://firststreet.org/research-lab/published-research/flood-model-methodology_overview/" target="_blank">here</a>.',
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
					id:"-h8",
					value:"0",
					label:"HUC-8"
				},
				b2:{
					id:"-h12",
					value:"1",
					label:"HUC-12"
				},
				b3:{
					id:"-catch",
					value:"2",
					label:"Catchment"
				}
			}
		}
	}
}
// object to build filter controls
app.filterObj = {
	group0:{
		header: "Available Floodplain Area",
		controls:{
			con0:{
				type:"slider",
				field:"Acres",
				label:"Available unprotected floodplain area for the currently specified flood frequency",
				unit:"acres",
				single:true
			}	
		}
	},
	group1:{
		header: "Nutrients",
		controls:{
			con0:{
				type:"slider",
				field:"IL_TNp",
				label:"Local nutrient loading (nitrogen)",
				unit:""
			},
			con1:{
				type:"slider",
				field:"IL_TPp",
				label:"Local nutrient loading (phosphorus)",
				unit:""
			},
			con2:{
				type:"slider",
				field:"IL_TN_DELp",
				label:"Nutrient loading to Gulf of Mexico (nitrogen)",
				unit:""
			},
			con3:{
				type:"slider",
				field:"IL_TP_DELp",
				label:"Nutrient loading to Gulf of Mexico (phosphorus)",
				unit:""
			}
		}
	},
	group2:{
		header:"Soils/Land Use",
		controls:{
			con0:{
				type:"slider",
				field:"nccpi",
				label:"Agricultural productivity potential of soils in the floodplain",
				unit:""
			},
			con1:{
				type:"slider",
				field:"drain",
				label:"Percent of floodplain in somewhat poorly, poorly, & very poorly drained soils",
				unit:"%"
			},
			con2:{
				type:"slider",
				field:"NRCS",
				label:"NRCS Watershed Vulnerability Index",
				unit:""
			}
		}
	},
	group3:{
		header:"Habitat",
		controls:{
			con0:{
				type:"slider",
				field:"nearProt",
				label:"Floodplains near protected lands",
				unit:"acres"
			},
			con1:{
				type:"radio",
				field:"nearIBA",
				label:"Important Bird Areas"
			},
			con2:{
				type:"radio",
				field:"inTNC",
				label:"Nature Conservancy ecoregional assessment units"
			},
			con3:{
				type:"slider",
				field:"cumu_hci",
				label:"National Fish Habitat Partnership cumulative habitat condition index",
				unit:""
			},
			con4:{
				type:"slider",
				field:"resil",
				label:"Terrestrial resilience",
				unit:""
			},
			con5:{
				type:"slider",
				field:"swap1",
				label:"TN-SWAP 2015 priorities upstream of aquatic habitats",
				unit:""
			},
			con6:{
				type:"slider",
				field:"swap2",
				label:"TN-SWAP 2015 terrestrial restoration priorities",
				unit:""
			},
			con7:{
				type:"slider",
				field:"swap3",
				label:"TN-SWAP 2015 terrestrial habitat priorities",
				unit:""
			}
		}
	},
	group4:{
		header:"Population Exposure",
		controls:{
			con0:{
				type:"slider",
				field:"pop",
				label:"Population living in unprotected floodplain of the currently specified flood frequency",
				single:true,
				unit:""
			}
		}		
	},
	group5:{
		header:"Flood Damages",
		controls:{
			con0:{
				type:"slider",
				field:"damages",
				label:"Projected future flood damages (2050) ($)",
				single:true,
				unit:"$"
			}
		}		
	},
	group6:{
		header:"Social Vulnerability",
		controls:{
			con0:{
				type:"slider",
				field:"SOVI",
				label:"Index of social vulnerability to environmental hazards",
				single:true,
				unit:""
			}
		}		
	}
	
}
// define if app has supporting layers
app.hasSupportingLayers = true;
// feature layers obj
app.mapImageLayers = [
	{
		id: 0,
		visible: false,
		title: "HUC 8s",
		opacity: 0.5
	},
	{
		id: 1,
		visible: false,
		title: "HUC 12s",
		opacity: 0.5
	},
	{
		id: 2,
		visible: false,
		title: "Catchments",
		opacity: 0.5
	},
	{
		id: 9,
		visible: false,
		title: "Soil drainage classes",
		opacity: 0.8,
		supporting: true,
		info: "<a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1296622&ext=pdf' target='_blank'>More Info</a>"
	},
	{
		id: 3,
		visible: false,
		title: "5-Year Floodplain",
		opacity: 0.8,
		supporting: true
	},
	{
		id: 4,
		visible: false,
		title: "100-Year Floodplain",
		opacity: 0.8,
		supporting: true
	},
	{
		id: 5,
		visible: false,
		title: "500-Year Floodplain",
		opacity: 0.8,
		supporting: true
	},
	{
		id: 6,
		visible: false,
		title: "Relative inundation frequency (from satellite imagery)",
		opacity: 0.8,
		supporting: true,
		info: "<b>Relative inundation frequency (from satellite imagery)</b><br>This data layer was developed by the Gulf Coastal Plains & Ozarks Landscape Conservation Cooperative. It is a mosaic of multiple satellite images over time to show relative inundation across the landscape. <a href='https://www.sciencebase.gov/catalog/item/5617e3c3e4b0cdb063e3fc35' target='_blank'>More Info</a>"
	},
	{
		id: 7,
		visible: false,
		title: "FEMA flood hazard zones",
		opacity: 0.8,
		supporting: true,
		info: "<b>FEMA flood hazard zones</b><br><a href='https://snmapmod.snco.us/fmm/document/fema-flood-zone-definitions.pdf' target='_blank'>More Info</a>"
	},
	{
		id: 8,
		visible: false,
		title: "Protected Areas Database of the U.S.",
		opacity: 0.8,
		supporting: true,
	}
]


// definition expression root field names
app.Acres = "";
app.IL_TNp = "";
app.IL_TPp = "";
app.IL_TN_DELp = "";
app.IL_TP_DELp = "";
app.nccpi = "";
app.drain = "";
app.NRCS = "";
app.nearProt = "";
app.nearIBA = "";
app.inTNC = "";
app.cumu_hci = "";
app.resil = "";
app.swap1 = "";
app.swap2 = "";
app.swap3 = "";
app.pop = "";
app.damages = "";
app.SOVI = "";

// object for range slider
app.sliderObj = {
	// huc 8 + 1 in 5 year flood
	h81:{
		Acres:{
			values:[],vis:true,min:0,max:56000,gtmax:true,
			info:"<b>Available unprotected floodplain area for the currently specified flood frequency</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
		}, 
		IL_TNp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (nitrogen)</b><br>Kg/yr of nitrogen exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TPp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (phosphorus)</b><br>Kg/yr of phosphorus exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TN_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (nitrogen)</b><br> Kg/yr of nitrogen from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TP_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (phosphorus)</b><br> Kg/yr of phosphorus from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw value). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		nccpi:{
			values:[],vis:true,min:0,max:0.52,step:0.01,
			info:"<b>Agricultural productivity potential of soils in the floodplain</b><br> Uses the National Commodity Crop Productivity Index (NCCPI), an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1295761&ext=pdf' target='_blank'>More Info</a>"
		},
		drain:{
			values:[],vis:true,min:63,max:93,
			info:"<b>Percent of floodplain in somewhat poorly, poorly, & very poorly drained soils</b><br> The percent of floodplain area that is in somewhat poorly, poorly, & very poorly drained soils, according to the SSURGO soils database. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1296622&ext=pdf' target='_blank'>More Info</a>"
		},
		NRCS:{
			values:[],vis:true,min:3.578,max:16.485,shfld:true,step:0.001,
			info:"<b>NRCS Watershed Vulnerability Index</b><br> Index to quantify watershed vulnerability to pollutant transport from croplands by surface runoff and leaching. Based on: SSURGO land capability class (soil suitability for most kinds of field crops), land cover from 2020 Cropland Data Layer (cropland, hayland, pastureland, forest, or other), and distance from stream. Range: 0-120."
		},
		nearProt:{
			values:[],vis:true,min:0,max:6200,gtmax:true,
			info:"<b>Floodplains near protected lands</b><br> Acres of unprotected floodplain within 0.25 miles of Protected Areas Database of the U.S. (PAD-US) protected lands. <a href='https://www.usgs.gov/core-science-systems/science-analytics-and-synthesis/gap/science/protected-areas' target='_blank'>More Info</a>"
		},
		cumu_hci:{
			values:[],vis:true,min:1.467,max:3.26,shfld:true,step:0.001,
			info:"<b>National Fish Habitat Partnership cumulative habitat condition index</b><br> Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. <a href='https://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
		},
		resil:{
			values:[],vis:true,min:-0.542,max:0.488,step:0.001,
			info:"<b>Terrestrial resilience</b><br> The terrestrial resilience score estimates the climate resilience of an area of land based on: a). its landscape diversity (estimated microclimates) and b). local connectedness (lack of fragmentation). Each site is scored relative to all other sites in its ecoregion that have the same geophysical setting based on soils, bedrock geology, and elevation zone. Scores are standard deviations above the average score. Least resilient = -3.5 to -2.0; less resilient = -2.0 to -1.0; slightly less resilient = -1.0 to -0.5; average/median resilient = -0.5 to +0.5; slightly more resilient = +0.5 to +1.0; more resilient = +1.0 to +2.0; most resilient = +2.0 to +3.5. <a href='https://maps.tnc.org/resilientland/' target='_blank'>More Info</a>"
		},
		swap1:{
			values:[],vis:true,min:0,max:4.78,step:0.001,
			info:"<b>TN-SWAP 2015 priorities upstream of aquatic habitats</b><br> Land priorities adjacent to and upstream of aquatic habitat priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score ranges from 0 (no priority) to 9 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap2:{
			values:[],vis:true,min:0,max:20.749,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial restoration priorities</b><br> Terrestrial restoration priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Prioritizes areas of current semi-natural land use (agricultural lands) for restoration, based on potential near-term usage of restored habitat by terrestrial species of greatest conservation need. Score range = 0-100 statewide. Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap3:{
			values:[],vis:true,min:0,max:2.953,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial habitat priorities</b><br> Protection priorities for terrestrial species of greatest conservation need, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score range = 0 (no priority) to 5 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		pop:{
			values:[],vis:true,min:0,max:971,
			info:"<b>Population living in unprotected floodplain of the currently specified flood frequency</b><br> People currently living in unprotected floodplain of the currently specified flood frequency. Population determined using land-cover-weighted allocation of population. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/Supplemental/DasymetricAllocationofPopulation.pdf' target='_blank'>More Info</a>" 
		},
		damages:{
			values:[],vis:true,min:17000,max:338000000,
			info:"<b>Projected future flood damages (2050) ($)</b><br> Estimate of property damage in the floodplain corresponding to the currently selected flood frequency, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>" 
		},
		SOVI:{
			values:[],vis:true,min:0.381,max:2.259,shfld:true,step:0.001,
			info:"<b>Index of social vulnerability to environmental hazards</b><br> Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. Scores are standard deviations from an average vulnerability score of 0. Relative to the continental U.S., scores below -1 may be considered low social vulnerability, -1 to +1 medium, and above +1 high. <a href='https://link.springer.com/article/10.1007/s11069-020-04470-2' target='_blank'>More Info</a>" 
		}
	},
	// huc 8 + 1 in 100 year flood
	h82:{
		Acres:{
			values:[],vis:true,min:0,max:116000,gtmax:true,
			info:"<b>Available unprotected floodplain area for the currently specified flood frequency</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
		}, 
		IL_TNp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (nitrogen)</b><br>Kg/yr of nitrogen exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TPp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (phosphorus)</b><br>Kg/yr of phosphorus exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TN_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (nitrogen)</b><br> Kg/yr of nitrogen from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TP_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (phosphorus)</b><br> Kg/yr of phosphorus from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw value). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		nccpi:{
			values:[],vis:true,min:0,max:0.54,step:0.01,
			info:"<b>Agricultural productivity potential of soils in the floodplain</b><br> Uses the National Commodity Crop Productivity Index (NCCPI), an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1295761&ext=pdf' target='_blank'>More Info</a>"
		},
		drain:{
			values:[],vis:true,min:62,max:94,
			info:"<b>Percent of floodplain in somewhat poorly, poorly, & very poorly drained soils</b><br> The percent of floodplain area that is in somewhat poorly, poorly, & very poorly drained soils, according to the SSURGO soils database. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1296622&ext=pdf' target='_blank'>More Info</a>"
		},
		NRCS:{
			values:[],vis:true,min:3.578,max:16.485,shfld:true,step:0.001,
			info:"<b>NRCS Watershed Vulnerability Index</b><br> Index to quantify watershed vulnerability to pollutant transport from croplands by surface runoff and leaching. Based on: SSURGO land capability class (soil suitability for most kinds of field crops), land cover from 2020 Cropland Data Layer (cropland, hayland, pastureland, forest, or other), and distance from stream. Range: 0-120."
		},
		nearProt:{
			values:[],vis:true,min:0,max:19000,gtmax:true,
			info:"<b>Floodplains near protected lands</b><br> Acres of unprotected floodplain within 0.25 miles of Protected Areas Database of the U.S. (PAD-US) protected lands. <a href='https://www.usgs.gov/core-science-systems/science-analytics-and-synthesis/gap/science/protected-areas' target='_blank'>More Info</a>"
		},
		cumu_hci:{
			values:[],vis:true,min:1.467,max:3.26,shfld:true,step:0.001,
			info:"<b>National Fish Habitat Partnership cumulative habitat condition index</b><br> Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. <a href='https://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
		},
		resil:{
			values:[],vis:true,min:-1.19,max:0.426,step:0.001,
			info:"<b>Terrestrial resilience</b><br> The terrestrial resilience score estimates the climate resilience of an area of land based on: a). its landscape diversity (estimated microclimates) and b). local connectedness (lack of fragmentation). Each site is scored relative to all other sites in its ecoregion that have the same geophysical setting based on soils, bedrock geology, and elevation zone. Scores are standard deviations above the average score. Least resilient = -3.5 to -2.0; less resilient = -2.0 to -1.0; slightly less resilient = -1.0 to -0.5; average/median resilient = -0.5 to +0.5; slightly more resilient = +0.5 to +1.0; more resilient = +1.0 to +2.0; most resilient = +2.0 to +3.5. <a href='https://maps.tnc.org/resilientland/' target='_blank'>More Info</a>"
		},
		swap1:{
			values:[],vis:true,min:0,max:4.549,step:0.001,
			info:"<b>TN-SWAP 2015 priorities upstream of aquatic habitats</b><br> Land priorities adjacent to and upstream of aquatic habitat priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score ranges from 0 (no priority) to 9 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap2:{
			values:[],vis:true,min:0,max:22.069,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial restoration priorities</b><br> Terrestrial restoration priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Prioritizes areas of current semi-natural land use (agricultural lands) for restoration, based on potential near-term usage of restored habitat by terrestrial species of greatest conservation need. Score range = 0-100 statewide. Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap3:{
			values:[],vis:true,min:0,max:2.507,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial habitat priorities</b><br> Protection priorities for terrestrial species of greatest conservation need, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score range = 0 (no priority) to 5 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		pop:{
			values:[],vis:true,min:0,max:5016,
			info:"<b>Population living in unprotected floodplain of the currently specified flood frequency</b><br> People currently living in unprotected floodplain of the currently specified flood frequency. Population determined using land-cover-weighted allocation of population. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/Supplemental/DasymetricAllocationofPopulation.pdf' target='_blank'>More Info</a>" 
		},
		damages:{
			values:[],vis:true,min:219000,max:1100000000,
			info:"<b>Projected future flood damages (2050) ($)</b><br> Estimate of property damage in the floodplain corresponding to the currently selected flood frequency, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>" 
		},
		SOVI:{
			values:[],vis:true,min:0.381,max:2.259,shfld:true,step:0.001,
			info:"<b>Index of social vulnerability to environmental hazards</b><br> Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. Scores are standard deviations from an average vulnerability score of 0. Relative to the continental U.S., scores below -1 may be considered low social vulnerability, -1 to +1 medium, and above +1 high. <a href='https://link.springer.com/article/10.1007/s11069-020-04470-2' target='_blank'>More Info</a>" 
		}
	},
	// huc 8 + 1 in 500 year flood
	h83:{
		Acres:{
			values:[],vis:true,min:0,max:137000,gtmax:true,
			info:"<b>Available unprotected floodplain area for the currently specified flood frequency</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
		}, 
		IL_TNp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (nitrogen)</b><br>Kg/yr of nitrogen exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TPp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (phosphorus)</b><br>Kg/yr of phosphorus exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TN_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (nitrogen)</b><br> Kg/yr of nitrogen from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TP_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (phosphorus)</b><br> Kg/yr of phosphorus from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw value). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		nccpi:{
			values:[],vis:true,min:0,max:0.54,step:0.01,
			info:"<b>Agricultural productivity potential of soils in the floodplain</b><br> Uses the National Commodity Crop Productivity Index (NCCPI), an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1295761&ext=pdf' target='_blank'>More Info</a>"
		},
		drain:{
			values:[],vis:true,min:54,max:92,
			info:"<b>Percent of floodplain in somewhat poorly, poorly, & very poorly drained soils</b><br> The percent of floodplain area that is in somewhat poorly, poorly, & very poorly drained soils, according to the SSURGO soils database. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1296622&ext=pdf' target='_blank'>More Info</a>"
		},
		NRCS:{
			values:[],vis:true,min:3.578,max:16.485,shfld:true,step:0.001,
			info:"<b>NRCS Watershed Vulnerability Index</b><br> Index to quantify watershed vulnerability to pollutant transport from croplands by surface runoff and leaching. Based on: SSURGO land capability class (soil suitability for most kinds of field crops), land cover from 2020 Cropland Data Layer (cropland, hayland, pastureland, forest, or other), and distance from stream. Range: 0-120."
		},
		nearProt:{
			values:[],vis:true,min:0,max:22000,gtmax:true,
			info:"<b>Floodplains near protected lands</b><br> Acres of unprotected floodplain within 0.25 miles of Protected Areas Database of the U.S. (PAD-US) protected lands. <a href='https://www.usgs.gov/core-science-systems/science-analytics-and-synthesis/gap/science/protected-areas' target='_blank'>More Info</a>"
		},
		cumu_hci:{
			values:[],vis:true,min:1.467,max:3.26,shfld:true,step:0.001,
			info:"<b>National Fish Habitat Partnership cumulative habitat condition index</b><br> Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. <a href='https://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
		},
		resil:{
			values:[],vis:true,min:-1.236,max:0.405,step:0.001,
			info:"<b>Terrestrial resilience</b><br> The terrestrial resilience score estimates the climate resilience of an area of land based on: a). its landscape diversity (estimated microclimates) and b). local connectedness (lack of fragmentation). Each site is scored relative to all other sites in its ecoregion that have the same geophysical setting based on soils, bedrock geology, and elevation zone. Scores are standard deviations above the average score. Least resilient = -3.5 to -2.0; less resilient = -2.0 to -1.0; slightly less resilient = -1.0 to -0.5; average/median resilient = -0.5 to +0.5; slightly more resilient = +0.5 to +1.0; more resilient = +1.0 to +2.0; most resilient = +2.0 to +3.5. <a href='https://maps.tnc.org/resilientland/' target='_blank'>More Info</a>"
		},
		swap1:{
			values:[],vis:true,min:0,max:4.48,step:0.001,
			info:"<b>TN-SWAP 2015 priorities upstream of aquatic habitats</b><br> Land priorities adjacent to and upstream of aquatic habitat priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score ranges from 0 (no priority) to 9 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap2:{
			values:[],vis:true,min:0,max:22.309,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial restoration priorities</b><br> Terrestrial restoration priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Prioritizes areas of current semi-natural land use (agricultural lands) for restoration, based on potential near-term usage of restored habitat by terrestrial species of greatest conservation need. Score range = 0-100 statewide. Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap3:{
			values:[],vis:true,min:0,max:2.426,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial habitat priorities</b><br> Protection priorities for terrestrial species of greatest conservation need, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score range = 0 (no priority) to 5 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		pop:{
			values:[],vis:true,min:0,max:21488,
			info:"<b>Population living in unprotected floodplain of the currently specified flood frequency</b><br> People currently living in unprotected floodplain of the currently specified flood frequency. Population determined using land-cover-weighted allocation of population. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/Supplemental/DasymetricAllocationofPopulation.pdf' target='_blank'>More Info</a>" 
		},
		damages:{
			values:[],vis:true,min:99000,max:2200000000,
			info:"<b>Projected future flood damages (2050) ($)</b><br> Estimate of property damage in the floodplain corresponding to the currently selected flood frequency, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>" 
		},
		SOVI:{
			values:[],vis:true,min:0.381,max:2.259,shfld:true,step:0.001,
			info:"<b>Index of social vulnerability to environmental hazards</b><br> Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. Scores are standard deviations from an average vulnerability score of 0. Relative to the continental U.S., scores below -1 may be considered low social vulnerability, -1 to +1 medium, and above +1 high. <a href='https://link.springer.com/article/10.1007/s11069-020-04470-2' target='_blank'>More Info</a>" 
		}
	},

	// huc 12 + 1 in 5 year flood
	h121:{
		Acres:{
			values:[],vis:true,min:0,max:5000,gtmax:true,
			info:"<b>Available unprotected floodplain area for the currently specified flood frequency</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
		}, 
		IL_TNp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (nitrogen)</b><br>Kg/yr of nitrogen exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TPp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (phosphorus)</b><br>Kg/yr of phosphorus exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TN_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (nitrogen)</b><br> Kg/yr of nitrogen from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TP_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (phosphorus)</b><br> Kg/yr of phosphorus from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw value). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		nccpi:{
			values:[],vis:true,min:0,max:0.76,step:0.01,
			info:"<b>Agricultural productivity potential of soils in the floodplain</b><br> Uses the National Commodity Crop Productivity Index (NCCPI), an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1295761&ext=pdf' target='_blank'>More Info</a>"
		},
		drain:{
			values:[],vis:true,min:0,max:100,
			info:"<b>Percent of floodplain in somewhat poorly, poorly, & very poorly drained soils</b><br> The percent of floodplain area that is in somewhat poorly, poorly, & very poorly drained soils, according to the SSURGO soils database. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1296622&ext=pdf' target='_blank'>More Info</a>"
		},
		NRCS:{
			values:[],vis:true,min:0.709,max:18.907,shfld:true,step:0.001,
			info:"<b>NRCS Watershed Vulnerability Index</b><br> Index to quantify watershed vulnerability to pollutant transport from croplands by surface runoff and leaching. Based on: SSURGO land capability class (soil suitability for most kinds of field crops), land cover from 2020 Cropland Data Layer (cropland, hayland, pastureland, forest, or other), and distance from stream. Range: 0-120."
		},
		nearProt:{
			values:[],vis:true,min:0,max:1000,gtmax:true,
			info:"<b>Floodplains near protected lands</b><br> Acres of unprotected floodplain within 0.25 miles of Protected Areas Database of the U.S. (PAD-US) protected lands. <a href='https://www.usgs.gov/core-science-systems/science-analytics-and-synthesis/gap/science/protected-areas' target='_blank'>More Info</a>"
		},
		cumu_hci:{
			values:[],vis:true,min:1.05,max:4.292,shfld:true,step:0.001,
			info:"<b>National Fish Habitat Partnership cumulative habitat condition index</b><br> Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. <a href='https://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
		},
		resil:{
			values:[],vis:true,min:-2.738,max:2.36,step:0.001,
			info:"<b>Terrestrial resilience</b><br> The terrestrial resilience score estimates the climate resilience of an area of land based on: a). its landscape diversity (estimated microclimates) and b). local connectedness (lack of fragmentation). Each site is scored relative to all other sites in its ecoregion that have the same geophysical setting based on soils, bedrock geology, and elevation zone. Scores are standard deviations above the average score. Least resilient = -3.5 to -2.0; less resilient = -2.0 to -1.0; slightly less resilient = -1.0 to -0.5; average/median resilient = -0.5 to +0.5; slightly more resilient = +0.5 to +1.0; more resilient = +1.0 to +2.0; most resilient = +2.0 to +3.5. <a href='https://maps.tnc.org/resilientland/' target='_blank'>More Info</a>"
		},
		swap1:{
			values:[],vis:true,min:0,max:6.949,step:0.001,
			info:"<b>TN-SWAP 2015 priorities upstream of aquatic habitats</b><br> Land priorities adjacent to and upstream of aquatic habitat priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score ranges from 0 (no priority) to 9 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap2:{
			values:[],vis:true,min:0,max:41.797,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial restoration priorities</b><br> Terrestrial restoration priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Prioritizes areas of current semi-natural land use (agricultural lands) for restoration, based on potential near-term usage of restored habitat by terrestrial species of greatest conservation need. Score range = 0-100 statewide. Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap3:{
			values:[],vis:true,min:0,max:4.161,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial habitat priorities</b><br> Protection priorities for terrestrial species of greatest conservation need, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score range = 0 (no priority) to 5 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		pop:{
			values:[],vis:true,min:0,max:30,gtmax:true,
			info:"<b>Population living in unprotected floodplain of the currently specified flood frequency</b><br> People currently living in unprotected floodplain of the currently specified flood frequency. Population determined using land-cover-weighted allocation of population. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/Supplemental/DasymetricAllocationofPopulation.pdf' target='_blank'>More Info</a>" 
		},
		damages:{
			values:[],vis:true,min:0,max:10000000,gtmax:true,
			info:"<b>Projected future flood damages (2050) ($)</b><br> Estimate of property damage in the floodplain corresponding to the currently selected flood frequency, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>" 
		},
		SOVI:{
			values:[],vis:true,min:-1.776,max:5.362,shfld:true,step:0.001,
			info:"<b>Index of social vulnerability to environmental hazards</b><br> Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. Scores are standard deviations from an average vulnerability score of 0. Relative to the continental U.S., scores below -1 may be considered low social vulnerability, -1 to +1 medium, and above +1 high. <a href='https://link.springer.com/article/10.1007/s11069-020-04470-2' target='_blank'>More Info</a>" 
		}
	},
	// huc 12 + 1 in 100 year flood
	h122:{
		Acres:{
			values:[],vis:true,min:0,max:8000,gtmax:true,
			info:"<b>Available unprotected floodplain area for the currently specified flood frequency</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
		}, 
		IL_TNp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (nitrogen)</b><br>Kg/yr of nitrogen exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TPp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (phosphorus)</b><br>Kg/yr of phosphorus exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TN_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (nitrogen)</b><br> Kg/yr of nitrogen from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TP_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (phosphorus)</b><br> Kg/yr of phosphorus from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw value). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		nccpi:{
			values:[],vis:true,min:0,max:0.75,step:0.01,
			info:"<b>Agricultural productivity potential of soils in the floodplain</b><br> Uses the National Commodity Crop Productivity Index (NCCPI), an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1295761&ext=pdf' target='_blank'>More Info</a>"
		},
		drain:{
			values:[],vis:true,min:0,max:100,
			info:"<b>Percent of floodplain in somewhat poorly, poorly, & very poorly drained soils</b><br> The percent of floodplain area that is in somewhat poorly, poorly, & very poorly drained soils, according to the SSURGO soils database. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1296622&ext=pdf' target='_blank'>More Info</a>"
		},
		NRCS:{
			values:[],vis:true,min:0.709,max:18.907,shfld:true,step:0.001,
			info:"<b>NRCS Watershed Vulnerability Index</b><br> Index to quantify watershed vulnerability to pollutant transport from croplands by surface runoff and leaching. Based on: SSURGO land capability class (soil suitability for most kinds of field crops), land cover from 2020 Cropland Data Layer (cropland, hayland, pastureland, forest, or other), and distance from stream. Range: 0-120."
		},
		nearProt:{
			values:[],vis:true,min:0,max:2000,gtmax:true,
			info:"<b>Floodplains near protected lands</b><br> Acres of unprotected floodplain within 0.25 miles of Protected Areas Database of the U.S. (PAD-US) protected lands. <a href='https://www.usgs.gov/core-science-systems/science-analytics-and-synthesis/gap/science/protected-areas' target='_blank'>More Info</a>"
		},
		cumu_hci:{
			values:[],vis:true,min:1.05,max:4.292,shfld:true,step:0.001,
			info:"<b>National Fish Habitat Partnership cumulative habitat condition index</b><br> Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. <a href='https://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
		},
		resil:{
			values:[],vis:true,min:-2.738,max:2.385,step:0.001,
			info:"<b>Terrestrial resilience</b><br> The terrestrial resilience score estimates the climate resilience of an area of land based on: a). its landscape diversity (estimated microclimates) and b). local connectedness (lack of fragmentation). Each site is scored relative to all other sites in its ecoregion that have the same geophysical setting based on soils, bedrock geology, and elevation zone. Scores are standard deviations above the average score. Least resilient = -3.5 to -2.0; less resilient = -2.0 to -1.0; slightly less resilient = -1.0 to -0.5; average/median resilient = -0.5 to +0.5; slightly more resilient = +0.5 to +1.0; more resilient = +1.0 to +2.0; most resilient = +2.0 to +3.5. <a href='https://maps.tnc.org/resilientland/' target='_blank'>More Info</a>"
		},
		swap1:{
			values:[],vis:true,min:0,max:6.906,step:0.001,
			info:"<b>TN-SWAP 2015 priorities upstream of aquatic habitats</b><br> Land priorities adjacent to and upstream of aquatic habitat priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score ranges from 0 (no priority) to 9 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap2:{
			values:[],vis:true,min:0,max:39.114,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial restoration priorities</b><br> Terrestrial restoration priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Prioritizes areas of current semi-natural land use (agricultural lands) for restoration, based on potential near-term usage of restored habitat by terrestrial species of greatest conservation need. Score range = 0-100 statewide. Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap3:{
			values:[],vis:true,min:0,max:4.107,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial habitat priorities</b><br> Protection priorities for terrestrial species of greatest conservation need, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score range = 0 (no priority) to 5 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		pop:{
			values:[],vis:true,min:0,max:100,gtmax:true,
			info:"<b>Population living in unprotected floodplain of the currently specified flood frequency</b><br> People currently living in unprotected floodplain of the currently specified flood frequency. Population determined using land-cover-weighted allocation of population. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/Supplemental/DasymetricAllocationofPopulation.pdf' target='_blank'>More Info</a>" 
		},
		damages:{
			values:[],vis:true,min:0,max:20000000,gtmax:true,
			info:"<b>Projected future flood damages (2050) ($)</b><br> Estimate of property damage in the floodplain corresponding to the currently selected flood frequency, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>" 
		},
		SOVI:{
			values:[],vis:true,min:-1.776,max:5.362,shfld:true,step:0.001,
			info:"<b>Index of social vulnerability to environmental hazards</b><br> Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. Scores are standard deviations from an average vulnerability score of 0. Relative to the continental U.S., scores below -1 may be considered low social vulnerability, -1 to +1 medium, and above +1 high. <a href='https://link.springer.com/article/10.1007/s11069-020-04470-2' target='_blank'>More Info</a>" 
		}
	},
	// huc 12 + 1 in 500 year flood
	h123:{
		Acres:{
			values:[],vis:true,min:0,max:10000,gtmax:true,
			info:"<b>Available unprotected floodplain area for the currently specified flood frequency</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
		}, 
		IL_TNp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (nitrogen)</b><br>Kg/yr of nitrogen exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TPp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (phosphorus)</b><br>Kg/yr of phosphorus exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TN_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (nitrogen)</b><br> Kg/yr of nitrogen from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TP_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (phosphorus)</b><br> Kg/yr of phosphorus from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw value). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		nccpi:{
			values:[],vis:true,min:0,max:0.74,step:0.01,
			info:"<b>Agricultural productivity potential of soils in the floodplain</b><br> Uses the National Commodity Crop Productivity Index (NCCPI), an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1295761&ext=pdf' target='_blank'>More Info</a>"
		},
		drain:{
			values:[],vis:true,min:0,max:100,
			info:"<b>Percent of floodplain in somewhat poorly, poorly, & very poorly drained soils</b><br> The percent of floodplain area that is in somewhat poorly, poorly, & very poorly drained soils, according to the SSURGO soils database. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1296622&ext=pdf' target='_blank'>More Info</a>"
		},
		NRCS:{
			values:[],vis:true,min:0.709,max:18.907,shfld:true,step:0.001,
			info:"<b>NRCS Watershed Vulnerability Index</b><br> Index to quantify watershed vulnerability to pollutant transport from croplands by surface runoff and leaching. Based on: SSURGO land capability class (soil suitability for most kinds of field crops), land cover from 2020 Cropland Data Layer (cropland, hayland, pastureland, forest, or other), and distance from stream. Range: 0-120."
		},
		nearProt:{
			values:[],vis:true,min:0,max:2000,gtmax:true,
			info:"<b>Floodplains near protected lands</b><br> Acres of unprotected floodplain within 0.25 miles of Protected Areas Database of the U.S. (PAD-US) protected lands. <a href='https://www.usgs.gov/core-science-systems/science-analytics-and-synthesis/gap/science/protected-areas' target='_blank'>More Info</a>"
		},
		cumu_hci:{
			values:[],vis:true,min:1.05,max:4.292,shfld:true,step:0.001,
			info:"<b>National Fish Habitat Partnership cumulative habitat condition index</b><br> Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. <a href='https://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
		},
		resil:{
			values:[],vis:true,min:-2.738,max:2.364,step:0.001,
			info:"<b>Terrestrial resilience</b><br> The terrestrial resilience score estimates the climate resilience of an area of land based on: a). its landscape diversity (estimated microclimates) and b). local connectedness (lack of fragmentation). Each site is scored relative to all other sites in its ecoregion that have the same geophysical setting based on soils, bedrock geology, and elevation zone. Scores are standard deviations above the average score. Least resilient = -3.5 to -2.0; less resilient = -2.0 to -1.0; slightly less resilient = -1.0 to -0.5; average/median resilient = -0.5 to +0.5; slightly more resilient = +0.5 to +1.0; more resilient = +1.0 to +2.0; most resilient = +2.0 to +3.5. <a href='https://maps.tnc.org/resilientland/' target='_blank'>More Info</a>"
		},
		swap1:{
			values:[],vis:true,min:0,max:6.858,step:0.001,
			info:"<b>TN-SWAP 2015 priorities upstream of aquatic habitats</b><br> Land priorities adjacent to and upstream of aquatic habitat priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score ranges from 0 (no priority) to 9 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap2:{
			values:[],vis:true,min:0,max:45.02,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial restoration priorities</b><br> Terrestrial restoration priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Prioritizes areas of current semi-natural land use (agricultural lands) for restoration, based on potential near-term usage of restored habitat by terrestrial species of greatest conservation need. Score range = 0-100 statewide. Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap3:{
			values:[],vis:true,min:0,max:4.081,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial habitat priorities</b><br> Protection priorities for terrestrial species of greatest conservation need, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score range = 0 (no priority) to 5 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		pop:{
			values:[],vis:true,min:0,max:150,gtmax:true,
			info:"<b>Population living in unprotected floodplain of the currently specified flood frequency</b><br> People currently living in unprotected floodplain of the currently specified flood frequency. Population determined using land-cover-weighted allocation of population. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/Supplemental/DasymetricAllocationofPopulation.pdf' target='_blank'>More Info</a>" 
		},
		damages:{
			values:[],vis:true,min:0,max:35000000,gtmax:true,
			info:"<b>Projected future flood damages (2050) ($)</b><br> Estimate of property damage in the floodplain corresponding to the currently selected flood frequency, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>" 
		},
		SOVI:{
			values:[],vis:true,min:-1.776,max:5.362,shfld:true,step:0.001,
			info:"<b>Index of social vulnerability to environmental hazards</b><br> Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. Scores are standard deviations from an average vulnerability score of 0. Relative to the continental U.S., scores below -1 may be considered low social vulnerability, -1 to +1 medium, and above +1 high. <a href='https://link.springer.com/article/10.1007/s11069-020-04470-2' target='_blank'>More Info</a>" 
		}
	},

	// catchment + 1 in 5 year flood
	catch1:{
		Acres:{
			values:[],vis:true,min:0,max:100,gtmax:true,
			info:"<b>Available unprotected floodplain area for the currently specified flood frequency</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
		}, 
		IL_TNp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (nitrogen)</b><br>Kg/yr of nitrogen exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TPp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (phosphorus)</b><br>Kg/yr of phosphorus exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TN_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (nitrogen)</b><br> Kg/yr of nitrogen from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TP_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (phosphorus)</b><br> Kg/yr of phosphorus from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw value). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		nccpi:{
			values:[],vis:true,min:0,max:0.79,step:0.01,
			info:"<b>Agricultural productivity potential of soils in the floodplain</b><br> Uses the National Commodity Crop Productivity Index (NCCPI), an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1295761&ext=pdf' target='_blank'>More Info</a>"
		},
		drain:{
			values:[],vis:true,min:0,max:100,
			info:"<b>Percent of floodplain in somewhat poorly, poorly, & very poorly drained soils</b><br> The percent of floodplain area that is in somewhat poorly, poorly, & very poorly drained soils, according to the SSURGO soils database. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1296622&ext=pdf' target='_blank'>More Info</a>"
		},
		NRCS:{
			values:[],vis:true,min:0,max:71.89,shfld:true,step:0.001,
			info:"<b>NRCS Watershed Vulnerability Index</b><br> Index to quantify watershed vulnerability to pollutant transport from croplands by surface runoff and leaching. Based on: SSURGO land capability class (soil suitability for most kinds of field crops), land cover from 2020 Cropland Data Layer (cropland, hayland, pastureland, forest, or other), and distance from stream. Range: 0-120."
		},
		nearProt:{
			values:[],vis:true,min:0,max:100,gtmax:true,
			info:"<b>Floodplains near protected lands</b><br> Acres of unprotected floodplain within 0.25 miles of Protected Areas Database of the U.S. (PAD-US) protected lands. <a href='https://www.usgs.gov/core-science-systems/science-analytics-and-synthesis/gap/science/protected-areas' target='_blank'>More Info</a>"
		},
		cumu_hci:{
			values:[],vis:true,min:1,max:4.8,shfld:true,step:0.001,
			info:"<b>National Fish Habitat Partnership cumulative habitat condition index</b><br> Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. <a href='https://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
		},
		resil:{
			values:[],vis:true,min:-3.338,max:2.917,step:0.001,
			info:"<b>Terrestrial resilience</b><br> The terrestrial resilience score estimates the climate resilience of an area of land based on: a). its landscape diversity (estimated microclimates) and b). local connectedness (lack of fragmentation). Each site is scored relative to all other sites in its ecoregion that have the same geophysical setting based on soils, bedrock geology, and elevation zone. Scores are standard deviations above the average score. Least resilient = -3.5 to -2.0; less resilient = -2.0 to -1.0; slightly less resilient = -1.0 to -0.5; average/median resilient = -0.5 to +0.5; slightly more resilient = +0.5 to +1.0; more resilient = +1.0 to +2.0; most resilient = +2.0 to +3.5. <a href='https://maps.tnc.org/resilientland/' target='_blank'>More Info</a>"
		},
		swap1:{
			values:[],vis:true,min:0,max:7.821,step:0.001,
			info:"<b>TN-SWAP 2015 priorities upstream of aquatic habitats</b><br> Land priorities adjacent to and upstream of aquatic habitat priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score ranges from 0 (no priority) to 9 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap2:{
			values:[],vis:true,min:0,max:63.934,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial restoration priorities</b><br> Terrestrial restoration priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Prioritizes areas of current semi-natural land use (agricultural lands) for restoration, based on potential near-term usage of restored habitat by terrestrial species of greatest conservation need. Score range = 0-100 statewide. Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap3:{
			values:[],vis:true,min:0,max:5.000,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial habitat priorities</b><br> Protection priorities for terrestrial species of greatest conservation need, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score range = 0 (no priority) to 5 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		pop:{
			values:[],vis:true,min:0,max:5,gtmax:true,
			info:"<b>Population living in unprotected floodplain of the currently specified flood frequency</b><br> People currently living in unprotected floodplain of the currently specified flood frequency. Population determined using land-cover-weighted allocation of population. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/Supplemental/DasymetricAllocationofPopulation.pdf' target='_blank'>More Info</a>" 
		},
		damages:{
			values:[],vis:true,min:0,max:1000000,gtmax:true,
			info:"<b>Projected future flood damages (2050) ($)</b><br> Estimate of property damage in the floodplain corresponding to the currently selected flood frequency, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>" 
		},
		SOVI:{
			values:[],vis:true,min:-3.827,max:7.075,shfld:true,step:0.001,
			info:"<b>Index of social vulnerability to environmental hazards</b><br> Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. Scores are standard deviations from an average vulnerability score of 0. Relative to the continental U.S., scores below -1 may be considered low social vulnerability, -1 to +1 medium, and above +1 high. <a href='https://link.springer.com/article/10.1007/s11069-020-04470-2' target='_blank'>More Info</a>" 
		}
	},
	// catchment + 1 in 100 year flood
	catch2:{
		Acres:{
			values:[],vis:true,min:0,max:250,gtmax:true,
			info:"<b>Available unprotected floodplain area for the currently specified flood frequency</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
		}, 
		IL_TNp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (nitrogen)</b><br>Kg/yr of nitrogen exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TPp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (phosphorus)</b><br>Kg/yr of phosphorus exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TN_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (nitrogen)</b><br> Kg/yr of nitrogen from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TP_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (phosphorus)</b><br> Kg/yr of phosphorus from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw value). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		nccpi:{
			values:[],vis:true,min:0,max:0.81,step:0.01,
			info:"<b>Agricultural productivity potential of soils in the floodplain</b><br> Uses the National Commodity Crop Productivity Index (NCCPI), an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1295761&ext=pdf' target='_blank'>More Info</a>"
		},
		drain:{
			values:[],vis:true,min:0,max:100,
			info:"<b>Percent of floodplain in somewhat poorly, poorly, & very poorly drained soils</b><br> The percent of floodplain area that is in somewhat poorly, poorly, & very poorly drained soils, according to the SSURGO soils database. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1296622&ext=pdf' target='_blank'>More Info</a>"
		},
		NRCS:{
			values:[],vis:true,min:0,max:71.89,shfld:true,step:0.001,
			info:"<b>NRCS Watershed Vulnerability Index</b><br> Index to quantify watershed vulnerability to pollutant transport from croplands by surface runoff and leaching. Based on: SSURGO land capability class (soil suitability for most kinds of field crops), land cover from 2020 Cropland Data Layer (cropland, hayland, pastureland, forest, or other), and distance from stream. Range: 0-120."
		},
		nearProt:{
			values:[],vis:true,min:0,max:100,gtmax:true,
			info:"<b>Floodplains near protected lands</b><br> Acres of unprotected floodplain within 0.25 miles of Protected Areas Database of the U.S. (PAD-US) protected lands. <a href='https://www.usgs.gov/core-science-systems/science-analytics-and-synthesis/gap/science/protected-areas' target='_blank'>More Info</a>"
		},
		cumu_hci:{
			values:[],vis:true,min:1,max:4.8,shfld:true,step:0.001,
			info:"<b>National Fish Habitat Partnership cumulative habitat condition index</b><br> Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. <a href='https://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
		},
		resil:{
			values:[],vis:true,min:-3.7,max:3.021,step:0.001,
			info:"<b>Terrestrial resilience</b><br> The terrestrial resilience score estimates the climate resilience of an area of land based on: a). its landscape diversity (estimated microclimates) and b). local connectedness (lack of fragmentation). Each site is scored relative to all other sites in its ecoregion that have the same geophysical setting based on soils, bedrock geology, and elevation zone. Scores are standard deviations above the average score. Least resilient = -3.5 to -2.0; less resilient = -2.0 to -1.0; slightly less resilient = -1.0 to -0.5; average/median resilient = -0.5 to +0.5; slightly more resilient = +0.5 to +1.0; more resilient = +1.0 to +2.0; most resilient = +2.0 to +3.5. <a href='https://maps.tnc.org/resilientland/' target='_blank'>More Info</a>"
		},
		swap1:{
			values:[],vis:true,min:0,max:7.722,step:0.001,
			info:"<b>TN-SWAP 2015 priorities upstream of aquatic habitats</b><br> Land priorities adjacent to and upstream of aquatic habitat priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score ranges from 0 (no priority) to 9 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap2:{
			values:[],vis:true,min:0,max:68.000,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial restoration priorities</b><br> Terrestrial restoration priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Prioritizes areas of current semi-natural land use (agricultural lands) for restoration, based on potential near-term usage of restored habitat by terrestrial species of greatest conservation need. Score range = 0-100 statewide. Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap3:{
			values:[],vis:true,min:0,max:5.000,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial habitat priorities</b><br> Protection priorities for terrestrial species of greatest conservation need, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score range = 0 (no priority) to 5 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		pop:{
			values:[],vis:true,min:0,max:5,gtmax:true,
			info:"<b>Population living in unprotected floodplain of the currently specified flood frequency</b><br> People currently living in unprotected floodplain of the currently specified flood frequency. Population determined using land-cover-weighted allocation of population. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/Supplemental/DasymetricAllocationofPopulation.pdf' target='_blank'>More Info</a>" 
		},
		damages:{
			values:[],vis:true,min:0,max:1000000,gtmax:true,
			info:"<b>Projected future flood damages (2050) ($)</b><br> Estimate of property damage in the floodplain corresponding to the currently selected flood frequency, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>" 
		},
		SOVI:{
			values:[],vis:true,min:-3.827,max:7.075,shfld:true,step:0.001,
			info:"<b>Index of social vulnerability to environmental hazards</b><br> Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. Scores are standard deviations from an average vulnerability score of 0. Relative to the continental U.S., scores below -1 may be considered low social vulnerability, -1 to +1 medium, and above +1 high. <a href='https://link.springer.com/article/10.1007/s11069-020-04470-2' target='_blank'>More Info</a>" 
		}
	},
	// catchment + 1 in 500 year flood
	catch3:{
		Acres:{
			values:[],vis:true,min:0,max:250,gtmax:true,
			info:"<b>Available unprotected floodplain area for the currently specified flood frequency</b><br>Area of floodplain in forest, wetland, or grassland that is not currently in protected status."
		}, 
		IL_TNp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (nitrogen)</b><br>Kg/yr of nitrogen exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TPp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Local nutrient loading (phosphorus)</b><br>Kg/yr of phosphorus exported at the mouth of the catchment, normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TN_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (nitrogen)</b><br> Kg/yr of nitrogen from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw values). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		IL_TP_DELp:{
			values:[],vis:true,min:0,max:100,shfld:true,
			info:"<b>Nutrient loading to Gulf of Mexico (phosphorus)</b><br> Kg/yr of phosphorus from within a given watershed that reaches the Gulf of Mexico, all normalized to 0-100 scale. (Click watershed units in map to see raw value). <a href='https://sparrow.wim.usgs.gov/sparrow-midwest-2012/' target='_blank'>More Info</a>"
		},
		nccpi:{
			values:[],vis:true,min:0,max:0.81,step:0.01,
			info:"<b>Agricultural productivity potential of soils in the floodplain</b><br> Uses the National Commodity Crop Productivity Index (NCCPI), an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1295761&ext=pdf' target='_blank'>More Info</a>"
		},
		drain:{
			values:[],vis:true,min:0,max:100,
			info:"<b>Percent of floodplain in somewhat poorly, poorly, & very poorly drained soils</b><br> The percent of floodplain area that is in somewhat poorly, poorly, & very poorly drained soils, according to the SSURGO soils database. <a href='https://www.nrcs.usda.gov/wps/PA_NRCSConsumption/download?cid=nrcseprd1296622&ext=pdf' target='_blank'>More Info</a>"
		},
		NRCS:{
			values:[],vis:true,min:0,max:71.89,shfld:true,step:0.001,
			info:"<b>NRCS Watershed Vulnerability Index</b><br> Index to quantify watershed vulnerability to pollutant transport from croplands by surface runoff and leaching. Based on: SSURGO land capability class (soil suitability for most kinds of field crops), land cover from 2020 Cropland Data Layer (cropland, hayland, pastureland, forest, or other), and distance from stream. Range: 0-120."
		},
		nearProt:{
			values:[],vis:true,min:0,max:100,gtmax:true,
			info:"<b>Floodplains near protected lands</b><br> Acres of unprotected floodplain within 0.25 miles of Protected Areas Database of the U.S. (PAD-US) protected lands. <a href='https://www.usgs.gov/core-science-systems/science-analytics-and-synthesis/gap/science/protected-areas' target='_blank'>More Info</a>"
		},
		cumu_hci:{
			values:[],vis:true,min:1,max:4.8,shfld:true,step:0.001,
			info:"<b>National Fish Habitat Partnership cumulative habitat condition index</b><br> Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. <a href='https://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
		},
		resil:{
			values:[],vis:true,min:-3.097,max:3.082,step:0.001,
			info:"<b>Terrestrial resilience</b><br> The terrestrial resilience score estimates the climate resilience of an area of land based on: a). its landscape diversity (estimated microclimates) and b). local connectedness (lack of fragmentation). Each site is scored relative to all other sites in its ecoregion that have the same geophysical setting based on soils, bedrock geology, and elevation zone. Scores are standard deviations above the average score. Least resilient = -3.5 to -2.0; less resilient = -2.0 to -1.0; slightly less resilient = -1.0 to -0.5; average/median resilient = -0.5 to +0.5; slightly more resilient = +0.5 to +1.0; more resilient = +1.0 to +2.0; most resilient = +2.0 to +3.5. <a href='https://maps.tnc.org/resilientland/' target='_blank'>More Info</a>"
		},
		swap1:{
			values:[],vis:true,min:0,max:7.698,step:0.001,
			info:"<b>TN-SWAP 2015 priorities upstream of aquatic habitats</b><br> Land priorities adjacent to and upstream of aquatic habitat priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score ranges from 0 (no priority) to 9 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap2:{
			values:[],vis:true,min:0,max:68.000,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial restoration priorities</b><br> Terrestrial restoration priorities, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Prioritizes areas of current semi-natural land use (agricultural lands) for restoration, based on potential near-term usage of restored habitat by terrestrial species of greatest conservation need. Score range = 0-100 statewide. Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		swap3:{
			values:[],vis:true,min:0,max:5.000,step:0.001,
			info:"<b>TN-SWAP 2015 terrestrial habitat priorities</b><br> Protection priorities for terrestrial species of greatest conservation need, according to Tennessee 2015 State Wildlife Action Plan (SWAP). Score range = 0 (no priority) to 5 (very high priority). Note this data does not exist in parts of the study area outside of Tennessee. <a href='https://www.tn.gov/content/dam/tn/twra/documents/swap/TN-SWAP-data-and-methods-update-report_September-2015.pdf' target='_blank'>More Info</a>" 
		},
		pop:{
			values:[],vis:true,min:0,max:5,gtmax:true,
			info:"<b>Population living in unprotected floodplain of the currently specified flood frequency</b><br> People currently living in unprotected floodplain of the currently specified flood frequency. Population determined using land-cover-weighted allocation of population. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/Supplemental/DasymetricAllocationofPopulation.pdf' target='_blank'>More Info</a>" 
		},
		damages:{
			values:[],vis:true,min:0,max:1000000,gtmax:true,
			info:"<b>Projected future flood damages (2050) ($)</b><br> Estimate of property damage in the floodplain corresponding to the currently selected flood frequency, given flood depth and projected 2050 land use / building type. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>" 
		},
		SOVI:{
			values:[],vis:true,min:-3.827,max:7.075,shfld:true,step:0.001,
			info:"<b>Index of social vulnerability to environmental hazards</b><br> Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. Scores are standard deviations from an average vulnerability score of 0. Relative to the continental U.S., scores below -1 may be considered low social vulnerability, -1 to +1 medium, and above +1 high. <a href='https://link.springer.com/article/10.1007/s11069-020-04470-2' target='_blank'>More Info</a>" 
		}
	}
}

// object for radio groups
app.radioObj = {
	// huc 8 + 1 in 5 year flood
	h81:{
		nearIBA:{
			vis:true,
			info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. Watersheds are classified as 'present' if there is floodplain in or within 0.25 miles of an Important Bird Area. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
		}, 
		inTNC:{
			vis:true,
			info:"<b>Nature Conservancy ecoregional assessment units</b><br> Ecoregional assessment units are all features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action. Watersheds are classified as 'present' when they contain floodplain in an ecoregional assessment unit."
		}
	},
	// huc 8 + 1 in 100 year flood
	h82:{
		nearIBA:{
			vis:true,
			info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. Watersheds are classified as 'present' if there is floodplain in or within 0.25 miles of an Important Bird Area. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
		}, 
		inTNC:{
			vis:true,
			info:"<b>Nature Conservancy ecoregional assessment units</b><br> Ecoregional assessment units are all features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action. Watersheds are classified as 'present' when they contain floodplain in an ecoregional assessment unit."
		}
	},
	// huc 8 + 1 in 500 year flood
	h83:{
		nearIBA:{
			vis:true,
			info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. Watersheds are classified as 'present' if there is floodplain in or within 0.25 miles of an Important Bird Area. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
		}, 
		inTNC:{
			vis:true,
			info:"<b>Nature Conservancy ecoregional assessment units</b><br> Ecoregional assessment units are all features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action. Watersheds are classified as 'present' when they contain floodplain in an ecoregional assessment unit."
		}
	},
	// huc 12 + 1 in 5 year flood
	h121:{
		nearIBA:{
			vis:true,
			info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. Watersheds are classified as 'present' if there is floodplain in or within 0.25 miles of an Important Bird Area. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
		}, 
		inTNC:{
			vis:true,
			info:"<b>Nature Conservancy ecoregional assessment units</b><br> Ecoregional assessment units are all features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action. Watersheds are classified as 'present' when they contain floodplain in an ecoregional assessment unit."
		}
	},
	// huc 12 + 1 in 100 year flood
	h122:{
		nearIBA:{
			vis:true,
			info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. Watersheds are classified as 'present' if there is floodplain in or within 0.25 miles of an Important Bird Area. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
		}, 
		inTNC:{
			vis:true,
			info:"<b>Nature Conservancy ecoregional assessment units</b><br> Ecoregional assessment units are all features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action. Watersheds are classified as 'present' when they contain floodplain in an ecoregional assessment unit."
		}
	},
	// huc 12 + 1 in 500 year flood
	h123:{
		nearIBA:{
			vis:true,
			info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. Watersheds are classified as 'present' if there is floodplain in or within 0.25 miles of an Important Bird Area. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
		}, 
		inTNC:{
			vis:true,
			info:"<b>Nature Conservancy ecoregional assessment units</b><br> Ecoregional assessment units are all features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action. Watersheds are classified as 'present' when they contain floodplain in an ecoregional assessment unit."
		}
	},
	// catchment + 1 in 5 year flood
	catch1:{
		nearIBA:{
			vis:true,
			info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. Watersheds are classified as 'present' if there is floodplain in or within 0.25 miles of an Important Bird Area. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
		}, 
		inTNC:{
			vis:true,
			info:"<b>Nature Conservancy ecoregional assessment units</b><br> Ecoregional assessment units are all features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action. Watersheds are classified as 'present' when they contain floodplain in an ecoregional assessment unit."
		}
	},
	// catchment + 1 in 100 year flood
	catch2:{
		nearIBA:{
			vis:true,
			info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. Watersheds are classified as 'present' if there is floodplain in or within 0.25 miles of an Important Bird Area. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
		}, 
		inTNC:{
			vis:true,
			info:"<b>Nature Conservancy ecoregional assessment units</b><br> Ecoregional assessment units are all features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action. Watersheds are classified as 'present' when they contain floodplain in an ecoregional assessment unit."
		}
	},
	// catchment + 1 in 500 year flood
	catch3:{
		nearIBA:{
			vis:true,
			info:"<b>Important Bird Areas</b><br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. Watersheds are classified as 'present' if there is floodplain in or within 0.25 miles of an Important Bird Area. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
		}, 
		inTNC:{
			vis:true,
			info:"<b>Nature Conservancy ecoregional assessment units</b><br> Ecoregional assessment units are all features identified in ecoregional assessments across the Nature Conservancy as places of biodiversity significance and priority areas for conservation action. Watersheds are classified as 'present' when they contain floodplain in an ecoregional assessment unit."
		}
	}
}
buildElements();