import { Container } from "unstated";
import fetch from "isomorphic-fetch";

class QuestionsContainer extends Container {
  constructor(props = {}) {
    super(props);

    this.state = {
      housing: props.housingType || "",
      residents: {
        adults: undefined,
        teenagers: undefined,
        children: undefined,
        stayAtHome: undefined,
        residentalSize: ""
      },
      kitchen: {
        stove: undefined,
        fridge: undefined,
        dishwasher: undefined,
        dishwasherFrequence: ""
      },
      livingroom: {
        tv: undefined,
        tvBoxes: undefined,
        computers: undefined,
        consols: "",
        consolsFrequence: "",
        lamps: ""
      },
      washing: {
        washingmachine: undefined,
        washingmachineFrequence: "",
        dryer: undefined,
        dryerFrequence: ""
      },
      heating: {
        radiators: undefined,
        radiatorsSize: "",
        pumps: undefined,
        pumpsSize: "",
        myUsage: ""
      },
      caclulatedUsage: {
        totalUsage: undefined,
        averageUsage: undefined,
        kitchen: {
          stove: undefined,
          fridge: undefined,
          dishwasher: undefined,
          dishwasherAverage: undefined
        },
        livingroom: {
          tv: undefined,
          tvBoxes: undefined,
          computers: undefined,
          computersAverage: undefined,
          consols: undefined,
          consolsAverage: undefined,
          lamps: undefined
        },
        washing: {
          washingmachine: undefined,
          washingmachineAverage: undefined,
          dryer: undefined,
          dryerAverage: undefined
        },
        heating: {
          radiators: undefined,
          pumps: undefined,
          electricHeating: "",
          electricHeatingAverage: ""
        }
      },
      result: { usage: "", tips: [], maxUsage: undefined, extras: 0 },
      data: { kwh: {}, guiding: {}, tipsBad: {}, tipsGood: {} },
      calculate: true
    };

    // this.state = {
    //   housing: "hus",
    //   residents: {
    //     adults: 2,
    //     teenagers: 2,
    //     children: 0,
    //     stayAtHome: 0,
    //     residentalSize: "150"
    //   },
    //   kitchen: {
    //     stove: "induction",
    //     fridge: "combined",
    //     dishwasher: 1,
    //     dishwasherFrequence: "7"
    //   },
    //   livingroom: {
    //     tv: "2",
    //     tvBoxes: "2",
    //     computers: "0",
    //     consols: 0,
    //     consolsFrequence: "0",
    //     lamps: "40"
    //   },
    //   washing: {
    //     washingmachine: 1,
    //     washingmachineFrequence: "7",
    //     dryer: 1,
    //     dryerFrequence: "7"
    //   },
    //   heating: {
    //     radiators: 1,
    //     radiatorsSize: "100",
    //     pumps: 1,
    //     pumpsSize: "50",
    //     myUsage: "18000",
    //     electricHeating: ""
    //   },
    //   caclulatedUsage: {
    //     totalUsage: undefined,
    //     averageUsage: undefined,
    //     kitchen: {
    //       stove: undefined,
    //       fridge: undefined,
    //       dishwasher: undefined,
    //       dishwasherAverage: undefined
    //     },
    //     livingroom: {
    //       tv: undefined,
    //       tvBoxes: undefined,
    //       computers: undefined,
    //       computersAverage: undefined,
    //       consols: undefined,
    //       consolsAverage: undefined,
    //       lamps: undefined
    //     },
    //     washing: {
    //       washingmachine: undefined,
    //       washingmachineAverage: undefined,
    //       dryer: undefined,
    //       dryerAverage: undefined
    //     },
    //     heating: {
    //       radiators: undefined,
    //       pumps: undefined,
    //       electricHeating: undefined,
    //       electricHeatingAverage: undefined
    //     }
    //   },
    //   result: {
    //     usage: "",
    //     tips: [],
    //     maxUsage: 0,
    //     extras: 0
    //   },
    //   data: {
    //     kwh: {},
    //     guiding: {},
    //     tipsBad: {},
    //     tipsGood: {},
    //     tipsEl: {}
    //   },
    //   calculate: true
    // };

    this.fetchData();
  }

  // CALCULATE KWH VALUES IS CALLED FROM THE RESULT PAGE
  calculateKwhValues() {
    this.setState({ calculate: false });

    const data = this.state.data.kwh;
    const residents = this.state.residents;
    const guiding = this.state.data.guiding;
    const kitchen = this.state.kitchen;
    const livingroom = this.state.livingroom;
    const washing = this.state.washing;
    const heating = this.state.heating;
    const tipsBad = this.state.data.tipsBad;
    const tipsGood = this.state.data.tipsGood;
    const tipsEl = this.state.data.tipsEl;
    const tipsArr = [];

    // Kitchen
    let stove = data.kitchen.stove[kitchen.stove];
    let fridge = data.kitchen.fridge[kitchen.fridge];
    let dishwasher =
      kitchen.dishwasher === 1
        ? Math.round(
            data.kitchen.dishwasher * parseInt(kitchen.dishwasherFrequence) * 52
          )
        : 0;
    let dishwasherAverage = data.kitchen.dishwasherAverage;
    tipsArr.push({
      type: "dishwasher",
      diff: dishwasher - dishwasherAverage,
      img: "imgKitchen"
    });

    //Livingroom
    let tv = Math.round(data.livingroom.tv * parseInt(livingroom.tv));
    let tvBoxes = Math.round(
      data.livingroom.tvBoxes * parseInt(livingroom.tvBoxes)
    );
    let computers = Math.round(
      data.livingroom.computers * parseInt(livingroom.computers)
    );
    let computersAverage = data.livingroom.computersAverage;
    tipsArr.push({
      type: "computers",
      diff: computers - computersAverage,
      img: "imgLivingroom"
    });

    let consols =
      livingroom.consols === 1
        ? Math.round(
            data.livingroom.consols * parseInt(livingroom.consolsFrequence)
          )
        : 0;
    let consolsAverage = data.livingroom.consolsAverage;
    tipsArr.push({
      type: "consols",
      diff: consols - consolsAverage,
      img: "imgLivingroom"
    });

    let lamps = Math.round(data.livingroom.lamps * parseInt(livingroom.lamps));
    let lampsAverage = data.livingroom.lampsAverage;
    tipsArr.push({
      type: "lamps",
      diff: lamps - lampsAverage,
      img: "imgLivingroom"
    });

    //Washing
    let washingmachine =
      washing.washingmachine === 1
        ? Math.round(
            (data.washing.washingmachineFrequence / 7) *
              parseInt(washing.washingmachineFrequence) *
              365
          )
        : 0;

    let washingmachineAverage = data.washing.washingmachineAverage;
    tipsArr.push({
      type: "washingmachine",
      diff: washingmachine - washingmachineAverage,
      img: "imgWashing"
    });

    let dryer =
      washing.dryer === 1
        ? Math.round(
            (data.washing.dryerFrequence / 7) *
              parseInt(washing.dryerFrequence) *
              365
          )
        : 0;

    let dryerAverage = data.washing.dryerAverage;
    tipsArr.push({
      type: "dryer",
      diff: dryer - dryerAverage,
      img: "imgWashing"
    });

    //Heating
    let radiators =
      heating.radiators === 1
        ? Math.round(data.heating.radiators * parseInt(heating.radiatorsSize))
        : 0;
    let pumps =
      heating.pumps === 1
        ? Math.round(data.heating.pumps * parseInt(heating.pumpsSize))
        : 0;
    let myUsage = Math.round(parseInt(heating.myUsage));

    // TOTAL USAGE CALCULATION
    let atHome = residents.stayAtHome * data.extras.athome;
    atHome = this.evalNum(atHome);
    stove = this.evalNum(stove);
    fridge = this.evalNum(fridge);
    dishwasher = this.evalNum(dishwasher);
    tv = this.evalNum(tv);
    tvBoxes = this.evalNum(tvBoxes);
    computers = this.evalNum(computers);
    lamps = this.evalNum(lamps);
    washingmachine = this.evalNum(washingmachine);
    dryer = this.evalNum(dryer);
    radiators = this.evalNum(radiators);
    pumps = this.evalNum(pumps);

    //If there are more than 4 people in the houshold, add extra kwh per teenager
    // let xtraKwh = 0;
    // let numOfPeople =
    //   parseInt(residents.adults) +
    //   parseInt(residents.teenagers) +
    //   parseInt(residents.children);
    // if (numOfPeople > 4) {
    //   let moreThan4 = numOfPeople - 4;
    //   if (this.state.housing === "hus") {
    //     xtraKwh = moreThan4 * parseInt(data.extras.house.teenager);
    //   } else {
    //     xtraKwh = moreThan4 * parseInt(data.extras.appartment.teenager);
    //   }
    // }

    let xtraKwh = 0;
    if (heating.electric === 1) {
      const adults = parseInt(residents.adults);
      const teenagers = parseInt(residents.teenagers);
      const children = parseInt(residents.children);

      if (this.state.housing === "hus") {
        xtraKwh =
          adults * parseInt(data.extras.house.adult) +
          teenagers * parseInt(data.extras.house.teenager) +
          children * parseInt(data.extras.house.child);
      } else {
        xtraKwh =
          adults * parseInt(data.extras.appartment.adult) +
          teenagers * parseInt(data.extras.appartment.teenager) +
          children * parseInt(data.extras.appartment.child);
      }
    }

    let totalUsageNoHeating =
      xtraKwh +
      atHome +
      stove +
      fridge +
      dishwasher +
      tv +
      tvBoxes +
      computers +
      lamps +
      washingmachine +
      dryer;

    let totalUsage =
      xtraKwh +
      atHome +
      stove +
      fridge +
      dishwasher +
      tv +
      tvBoxes +
      computers +
      lamps +
      washingmachine +
      dryer +
      radiators +
      pumps;

    //Calculate the expected heating usage
    let electricHeating = radiators + pumps;
    let electricHeatingAverage = electricHeating;
    let averageUsageNoHeating = this.handleAverageUsage(guiding, residents);
    let averageUsage = averageUsageNoHeating + electricHeating;
    let usageBenchmark = averageUsageNoHeating;
    let usagePredicted = totalUsageNoHeating;
    let myPredictedUsage = usagePredicted - usageBenchmark;

    if (myUsage > 0) {
      let realHeatingUsage = myUsage - usagePredicted;
      // let heatingStatus = realHeatingUsage - electricHeating;

      //IF THE USER SETS THE YEARLY USAGE, THE TOTAL ESTIMATED USAGE IS SET TO THIS VALUE
      totalUsage = myUsage;

      //IF THE USER SETS THE YEARLY USAGE, THE ELECTRIC HEATING IS CALCULATED
      electricHeating = realHeatingUsage;
    }

    // Evaluate the largest usage kwh among the calculations
    let maxUsage = Math.max(
      stove,
      fridge,
      dishwasher,
      tv,
      tvBoxes,
      computers,
      lamps,
      washingmachine,
      dryer,
      electricHeating,
      electricHeatingAverage,
      dishwasherAverage,
      computersAverage,
      consolsAverage,
      lampsAverage,
      washingmachineAverage,
      dryerAverage
    );

    console.log("--------------------------------------------------");
    console.log("Indtastet forbrug uden opvarmning", usagePredicted);
    console.log("Benchmark forbrug uden opvarmning", usageBenchmark);
    console.log("Over-/underforbrug", myPredictedUsage);

    console.log("Varme forbrug benchmark", electricHeating);
    console.log("Indtastet årsforbrug", myUsage);

    // Evaluate usage, is it higher og lower than out recommendation
    let evaluatedUsage = this.handleUsageResult(
      totalUsage,
      guiding,
      residents,
      electricHeatingAverage
    );

    // Evaluate which tips to display
    let evaluateTips = this.handleTips(
      tipsArr,
      tipsBad,
      tipsGood,
      tipsEl,
      evaluatedUsage,
      heating.electric
    );

    // Update the state with the calculated values
    this.setState(
      prevState => ({
        caclulatedUsage: {
          ...prevState.caclulatedUsage,
          totalUsage: this.formatNumber(totalUsage),
          averageUsage: this.formatNumber(averageUsage + xtraKwh),
          kitchen: {
            ...prevState.caclulatedUsage.kitchen,
            stove: stove,
            fridge: fridge,
            dishwasher: dishwasher,
            dishwasherAverage: dishwasherAverage
          },
          livingroom: {
            ...prevState.caclulatedUsage.livingroom,
            tv: tv,
            tvBoxes: tvBoxes,
            computers: computers,
            computersAverage: computersAverage,
            consols: consols,
            consolsAverage: consolsAverage,
            lamps: lamps,
            lampsAverage: lampsAverage
          },
          washing: {
            ...prevState.caclulatedUsage.washing,
            washingmachine: washingmachine,
            washingmachineAverage: washingmachineAverage,
            dryer: dryer,
            dryerAverage: dryerAverage
          },
          heating: {
            ...prevState.caclulatedUsage.heating,
            radiators: radiators,
            pumps: pumps,
            myUsage: myUsage,
            electricHeating: electricHeating,
            electricHeatingAverage: electricHeatingAverage
          }
        },
        result: {
          ...prevState.result,
          usage: evaluatedUsage,
          maxUsage: maxUsage,
          tips: evaluateTips,
          extras: xtraKwh
        }
      }),
      () => {
        // console.log(this.state);
      }
    );
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  // Handle results
  evalNum(num) {
    if (num === undefined || isNaN(num) || num === null) return 0;
    else return num;
  }

  handleTips(tipsArr, tipsBad, tipsGood, tipsEl, usage, electric) {
    let yourTips = [];

    if (usage === "over") {
      let tips = tipsBad;
      // Sort the TipsArr array e.g. {"tv", 1134} by the difference value to descent
      tipsArr.sort(function(a, b) {
        return b.diff - a.diff;
      });

      //Then remove the negative values (this means, that he/she uses less energy)
      tipsArr = tipsArr.filter(function(x) {
        return x.diff > -1;
      });

      // Trim the array to three items
      tipsArr = tipsArr.slice(0, 3);

      //Map tipsArr to the tips in the data file
      tipsArr.forEach(value => {
        yourTips.push({ tip: tips[value.type], img: value.img });
      });

      //If there is less than 3 tips, fill up with "stove" and "tv" tips
      const xtraTips = [
        { tip: tips["stove"], img: "imgKitchen" },
        { tip: tips["fridge"], img: "imgKitchen" },
        { tip: tips["tv"], img: "imgLivingroom" },
        { tip: tips["tvBoxes"], img: "imgLivingroom" },
        { tip: tips["floor"], img: "imgFloor" }
      ];
      if (yourTips.length === 2) {
        yourTips.push(xtraTips[Math.floor(Math.random() * xtraTips.length)]);
      } else if (yourTips.length === 1) {
        //Find first tip index,then find it in the array and then remove it,so that it is not reused
        const firstTipIndex = Math.floor(Math.random() * xtraTips.length);
        const firstTip = xtraTips[firstTipIndex];
        xtraTips.splice(firstTipIndex, 1);

        // Find second tip
        const secondTip = xtraTips[Math.floor(Math.random() * xtraTips.length)];
        yourTips.push(firstTip, secondTip);
      }
    } else {
      let tips = tipsGood;
      const GoodTips = [
        { tip: tips["stove"], img: "imgKitchen" },
        { tip: tips["dishwasher"], img: "imgKitchen" },
        { tip: tips["tv"], img: "imgLivingroom" },
        { tip: tips["consols"], img: "imgLivingroom" },
        { tip: tips["lamps"], img: "imgLivingroom" },
        { tip: tips["washingmachine"], img: "imgWashing" },
        { tip: tips["dryer"], img: "imgWashing" }
      ];

      //Remove irelevant tips, e.g. the user hasn't got a dishwasher
      if (this.state.livingroom.consols !== 1) GoodTips.splice(3, 1);
      if (this.state.washing.dryer !== 1) GoodTips.splice(6, 1);
      if (this.state.washing.washingmachine !== 1) GoodTips.splice(5, 1);
      if (this.state.kitchen.dishwasher !== 1) GoodTips.splice(1, 1);

      const firstTipIndex = Math.floor(Math.random() * GoodTips.length);
      const firstTip = GoodTips[firstTipIndex];
      GoodTips.splice(firstTipIndex, 1);

      const secondTipIndex = Math.floor(Math.random() * GoodTips.length);
      const secondTip = GoodTips[secondTipIndex];
      GoodTips.splice(secondTipIndex, 1);

      // Find second tip
      const thirdTip = GoodTips[Math.floor(Math.random() * GoodTips.length)];
      yourTips.push(firstTip, secondTip, thirdTip);
    }

    //If the user has Electricity heating, then add the electricty tip
    if (electric === 1) {
      yourTips[2] = { tip: tipsEl.el, img: "imgFloor" };
    }

    return yourTips;
  }

  handleAverageUsage(guiding, residents) {
    let guide;
    let numOfPeople =
      parseInt(residents.adults) +
      parseInt(residents.teenagers) +
      parseInt(residents.children);

    if (this.state.housing === "hus") {
      if (numOfPeople < 5) {
        guide = guiding.house[residents.adults - 1];
      } else {
        guide = guiding.house[4];
      }
    } else {
      if (numOfPeople < 5) {
        guide = guiding.appartment[residents.adults - 1];
      } else {
        guide = guiding.appartment[4];
      }
    }

    return guide;
  }

  handleUsageResult(usage, guiding, residents, electricHeating) {
    let guide;
    let usageState;
    let numOfPeople =
      parseInt(residents.adults) +
      parseInt(residents.teenagers) +
      parseInt(residents.children);

    if (this.state.housing === "hus") {
      if (numOfPeople < 5) {
        guide = guiding.house[residents.adults - 1];
      } else {
        guide = guiding.house[4];
      }
    } else {
      if (numOfPeople < 5) {
        guide = guiding.appartment[residents.adults - 1];
      } else {
        guide = guiding.appartment[4];
      }
    }

    guide += electricHeating;
    console.log(usage, guide);
    if (usage < guide) {
      usageState = "under";
    } else {
      usageState = "over";
    }

    return usageState;
  }

  // ANSWERS

  updateRadio = (index, key, value) => {
    this.setState({ [index]: { ...this.state[index], [key]: value } });

    if (
      (key === "pumps" && value === 0 && this.state.heating.radiators === 0) ||
      (key === "radiators" && value === 0 && this.state.heating.pumps === 0)
    ) {
      this.setState(
        prevState => ({
          heating: {
            ...prevState.heating,
            myUsage: "0"
          }
        }),
        () => {
          console.log("updated");
        }
      );
    }
  };

  updateNumber = (index, key, value) => {
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      this.setState({ [index]: { ...this.state[index], [key]: value } });
    }
  };

  updateSelecMenu = (index, key, value) => {
    this.setState({
      [index]: { ...this.state[index], [key]: value }
    });
  };

  updateHousingType = type => {
    this.setState({ housing: type });
  };

  // FETCHING & HANDELING DATA

  fetchData() {
    //https://orsted.dk/-/media/WWW/Assets/DCS/projects/el-tjek/static/media/data
    //data.json
    fetch("data.json", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(parsedJSON => this.handleData(parsedJSON))
      .catch(error =>
        console.log(
          "Vi mangler data for at kunne fortsætte, opdater venligst browseren for at forsøge igen."
        )
      );
  }

  handleData(res) {
    this.setState(
      {
        data: {
          ...this.state.data,
          kwh: res.kwh,
          guiding: res.kwh.guiding,
          tipsBad: res.result.tipsBad,
          tipsGood: res.result.tipsGood,
          tipsEl: res.result.tipsEl
        }
      },
      () => {
        this.calculateKwhValues();
      }
    );
  }

  resetCalculator() {
    if (!this.state.calculate) this.setState({ calculate: true });
  }
}

export default QuestionsContainer;
