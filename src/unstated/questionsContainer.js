import { Container } from "unstated";

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
        stove: "",
        fridge: "",
        dishwasher: undefined,
        dishwasherFrequence: ""
      },
      livingroom: {
        tv: "",
        tvBoxes: "",
        computers: "",
        consols: "",
        lamps: ""
      },
      washing: {
        washingmachine: undefined,
        washingmachineFrequence: "",
        dryer: undefined,
        dryerFrequence: ""
      },
      heating: {
        floor: undefined,
        floorSize: "",
        floorUsageFrequence: "",
        electric: undefined,
        electricUsageFrequence: ""
      },
      caclulatedUsage: {
        totalUsage: undefined,
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
        heating: { floor: undefined, electric: undefined }
      },
      result: { usage: "over", tips: [] },
      data: { kwh: {}, guiding: {}, tips: {} }
    };

    // this.state = {
    //   housing: "hus",
    //   residents: {
    //     adults: 2,
    //     teenagers: 2,
    //     children: 1,
    //     stayAtHome: 1,
    //     residentalSize: "123"
    //   },
    //   kitchen: {
    //     stove: "ceramic",
    //     fridge: "combined",
    //     dishwasher: 1,
    //     dishwasherFrequence: "1"
    //   },
    //   livingroom: {
    //     tv: "3",
    //     tvBoxes: "2",
    //     computers: "6",
    //     consols: "2",
    //     lamps: "30"
    //   },
    //   washing: {
    //     washingmachine: 1,
    //     washingmachineFrequence: "14",
    //     dryer: 1,
    //     dryerFrequence: "14"
    //   },
    //   heating: {
    //     floor: 1,
    //     floorSize: "128",
    //     floorUsageFrequence: "7",
    //     electric: 1,
    //     electricUsageFrequence: "3"
    //   },
    //   caclulatedUsage: {
    //     totalUsage: undefined,
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
    //     heating: { floor: undefined, electric: undefined }
    //   },
    //   result: { usage: "", tips: [] },
    //   data: { kwh: {}, guiding: {}, tips: {} }
    // };

    this.fetchData();
  }

  // CALCULATE KWH VALUES IS CALLED FROM THE RESULT PAGE
  calculateKwhValues() {
    const data = this.state.data.kwh;
    const residents = this.state.residents;
    const guiding = this.state.data.guiding;
    const kitchen = this.state.kitchen;
    const livingroom = this.state.livingroom;
    const washing = this.state.washing;
    const heating = this.state.heating;
    const tips = this.state.data.tips;
    const tipsArr = [];

    // Kitchen
    let stove = data.kitchen.stove[kitchen.stove];
    let fridge = data.kitchen.fridge[kitchen.fridge];
    let dishwasher = Math.round(
      data.kitchen.dishwasher * parseInt(kitchen.dishwasherFrequence) * 52
    );
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

    let consols = Math.round(
      data.livingroom.consols * parseInt(livingroom.consols)
    );
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
    let washingmachine = Math.round(
      (data.washing.washingmachineFrequence / 7) *
        parseInt(washing.washingmachineFrequence) *
        365
    );
    let washingmachineAverage = data.washing.washingmachineAverage;
    tipsArr.push({
      type: "washingmachine",
      diff: washingmachine - washingmachineAverage,
      img: "imgWashing"
    });

    let dryer = Math.round(
      (data.washing.dryerFrequence / 7) * parseInt(washing.dryerFrequence) * 365
    );
    let dryerAverage = data.washing.dryerAverage;
    tipsArr.push({
      type: "dryer",
      diff: dryer - dryerAverage,
      img: "imgWashing"
    });

    //Heating
    let floor = Math.round(
      (data.heating.floorSize * parseInt(heating.floorSize)) / 12
    );
    let electric = Math.round(
      (data.heating.electricUsageFrequence * parseInt(heating.floorSize)) / 6
    );

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
    floor = this.evalNum(floor);
    electric = this.evalNum(electric);

    let totalUsage =
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
      floor +
      electric;

    // Evaluate usage, is it higher og lower than out recommendation
    let evaluatedUsage = this.handleUsageResult(totalUsage, guiding, residents);

    // Evaluate which tips to display
    let evaluateTips = this.handleTips(tipsArr, tips);

    // Update the state with the calculated values
    this.setState(
      prevState => ({
        caclulatedUsage: {
          ...prevState.caclulatedUsage,
          totalUsage: totalUsage,
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
            floor: floor,
            electric: electric
          }
        },
        result: {
          ...prevState.result,
          usage: evaluatedUsage,
          tips: evaluateTips
        }
      }),
      () => {
        console.log(this.state);
      }
    );
  }

  // Handle results
  evalNum(num) {
    if (num === undefined || isNaN(num) || num === null) return 0;
    else return num;
  }

  handleTips(tipsArr, tips) {
    let yourTips = [];
    // Sort the TipsArr array e.g. {"tv", 1134} by the difference value to descent
    tipsArr.sort(function(a, b) {
      return b.diff - a.diff;
    });
    //Then remove the negative values (this means, that he/she uses less energy)
    tipsArr = tipsArr.filter(function(x) {
      return x.diff > -1;
    });

    // Trim the array to three items
    tipsArr = tipsArr.splice(0, 3);

    //Map tipsArr to the tips in the data file
    tipsArr.forEach(value => {
      yourTips.push({ tip: tips[value.type], img: value.img });
    });

    //If there is less than 3 tips, fill up with "stove" and "tv" tips
    if (yourTips.length === 2)
      yourTips.push({ tip: tips["stove"], img: "imgKitchen" });
    else if (yourTips.length === 1)
      yourTips.push(
        { tip: tips["stove"], img: "imgKitchen" },
        { tip: tips["tv"], img: "imgLivingroom" }
      );

    return yourTips;
  }

  handleUsageResult(usage, guiding, residents) {
    let guide;
    let usageState;
    let numOfPeople =
      residents.adults + residents.teenagers + residents.children;

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
    fetch("/data.json")
      .then(response => response.json())
      .then(parsedJSON => this.handleData(parsedJSON))
      .catch(error =>
        console.log(
          "Vi mangler data for at kunne fortsætte, opdater venligst browseren for at forsøge igen."
        )
      );
  }

  handleData(res) {
    console.log(res);
    this.setState(
      {
        data: {
          ...this.state.data,
          kwh: res.kwh,
          guiding: res.kwh.guiding,
          tips: res.result.tips
        }
      },
      () => {
        //this.calculateKwhValues();
      }
    );
  }
}

export default QuestionsContainer;
