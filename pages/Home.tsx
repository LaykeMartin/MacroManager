import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, NativeSyntheticEvent, TextInputChangeEventData, ScrollView } from "react-native"
import { Icon, Input } from 'react-native-elements';

interface Macros {
  carbs: number
  fat: number,
  protein: number,
}

const CaloriesPerGram = {
  carbs: 4,
  fat: 9,
  protein: 4
}
  


export const Home = () => {
  const [carbGoalInput, setCarbGoalInput] = useState<string>('0')
  const [fatGoalInput, setFatGoalInput] = useState<string>('0')
  const [proteinGoalInput, setProteinGoalInput] = useState<string>('0')

  const [carbGoal, setCarbGoal] = useState<string>('0')
  const [fatGoal, setFatGoal] = useState<string>('0')
  const [proteinGoal, setProteinGoal] = useState<string>('0')

  const [remainingCarbs, setRemainingCarbs] = useState<string>(carbGoal)
  const [remainingFat, setRemainingFat] = useState<string>(fatGoal)
  const [remainingProtein, setRemainingProtein] = useState<string>(proteinGoal)

  const [carbInput, setCarbIntakeInput] = useState<string>('0')
  const [fatInput, setFatIntakeInput] = useState<string>('0')
  const [proteinInput, setProteinIntakeInput] = useState<string>('0')

  const caloriesFromMacros = (c: number, f:number, p: number): number => {
    return (
      c * CaloriesPerGram.carbs +
      f * CaloriesPerGram.fat   +
      p * CaloriesPerGram.protein
    )
  }

  const carbHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setCarbIntakeInput(e.nativeEvent.text)
  };

  const fatHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setFatIntakeInput(e.nativeEvent.text)
  };

  const proteinHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setProteinIntakeInput(e.nativeEvent.text)
  };

  const addMacros = () => {
    setRemainingCarbs(`${+remainingCarbs - (+carbInput)}`)
    setRemainingFat(`${+remainingFat - (+fatInput)}`)
    setRemainingProtein(`${+remainingProtein - (+proteinInput)}`)
  }

  const subtractMacros = () => {
    setRemainingCarbs(`${+remainingCarbs + (+carbInput)}`)
    setRemainingFat(`${+remainingFat + (+fatInput)}`)
    setRemainingProtein(`${+remainingProtein + (+proteinInput)}`)
  }

  const resetRemaining = () => {
    setRemainingCarbs(carbGoal)
    setRemainingFat(fatGoal)
    setRemainingProtein(proteinGoal)
  }

  const resetIntake = () => {
    setCarbIntakeInput('0')
    setFatIntakeInput('0')
    setProteinIntakeInput('0')
  }

  const [settingsVisible, setSettingsVisible] = useState<boolean>(false)

  const saveGoals = async () => {
    setCarbGoal(carbGoalInput)
    setFatGoal(fatGoalInput)
    setProteinGoal(proteinGoalInput)
  }

  const editGoalsMenu = () => {
    return (
      <View >
        <Text>{`Carbs (grams)`}</Text>
        <Input 
          style={styles.input}
          keyboardType={'numeric'}
          value={carbGoalInput}
          onChange={(e) => setCarbGoalInput(e.nativeEvent.text)}
        />
        <Text>{`Fat (grams)`}</Text>
        <Input
          style={styles.input}
          keyboardType={'numeric'}
          value={fatGoalInput}
          onChange={(e) => setFatGoalInput(e.nativeEvent.text)}
        />
        <Text>{`Protein  (grams)`}</Text>
        <Input 
          style={styles.input}
          keyboardType={'numeric'}
          value={proteinGoalInput}
          onChange={(e) => setProteinGoalInput(e.nativeEvent.text)}
        />
        <View style={styles.saveBtn} >
          <TouchableOpacity>
            <Icon reverse name='check' type='font-awesome' onPress={async () => {
              saveGoals()
              setRemainingCarbs(carbGoalInput)
              setRemainingFat(fatGoalInput)
              setRemainingProtein(proteinGoalInput)
              setSettingsVisible(false)
            }}/>
          </TouchableOpacity>
        </View>
      </View>


    )
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Macro Manager</Text>
      </View>

      <View style={styles.section}>
        <View style={styles.subtitleContainer} >
          <Text style={styles.subtitle}>{`Goals`}</Text>
          <TouchableOpacity onPress={() => setSettingsVisible(!settingsVisible)}>
            <Icon style={styles.subtitle} name='gear' type='font-awesome'></Icon>
          </TouchableOpacity>
        </View>
        
        {settingsVisible ? editGoalsMenu() : null}

        <Text>{`Calories: ${caloriesFromMacros(+carbGoal, +fatGoal, +proteinGoal)} kcal`}</Text>
        <Text>{`Carbs.....${carbGoal}g`}</Text>
        <Text>{`Fat.......${fatGoal}g`}</Text>
        <Text>{`Protein...${proteinGoal}g`}</Text>
      </View>

      <View style={styles.sectionEmphasis}>
        <View style={styles.subtitleContainer} >
          <Text style={styles.subtitle}>{`Remaining`}</Text>
          <TouchableOpacity onPress={resetRemaining}>
            <Icon style={styles.subtitle} name='retweet' type='font-awesome'></Icon>
          </TouchableOpacity>
        </View>

        <Text>{`Calories: ${caloriesFromMacros(+remainingCarbs, +remainingFat, +remainingProtein)} kcal`}</Text>
        <Text>{`Carbs.....${remainingCarbs}g`}</Text>
        <Text>{`Fat.......${remainingFat}g`}</Text>
        <Text>{`Protein...${remainingProtein}g`}</Text>
      </View>

      <View style={styles.section}>
      <View style={styles.subtitleContainer} >
          <Text style={styles.subtitle}>{`Intake`}</Text>
          <TouchableOpacity onPress={resetIntake}>
            <Icon style={styles.subtitle} name='retweet' type='font-awesome'></Icon>
          </TouchableOpacity>
        </View>

        <Text>Carbs</Text>
        <View style={styles.inputContainer}>
          <Input 
              style={styles.input}
              keyboardType={'numeric'}
              value={carbInput}
              onChange={carbHandler}
            />
        </View>

        <Text>Fat</Text>
        <View style={styles.inputContainer}>
          <Input 
              style={styles.input}
              keyboardType={'numeric'}
              value={fatInput}
              onChange={fatHandler}
          />
        </View>

        <Text>Protein</Text>
        <View style={styles.inputContainer}>
          <Input 
            style={styles.input}
            keyboardType={'numeric'}
            value={proteinInput}
            onChange={proteinHandler}
          />
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={subtractMacros}>
          <Icon reverse name='arrow-down' type='font-awesome'></Icon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={addMacros}>
          <Icon reverse name='arrow-up' type='font-awesome'></Icon>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 10,
    paddingBottom: 50
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: 'bold',
    padding: 10,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle: {
    textAlign: "left",
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#e19d2d',
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    marginTop: 10,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      height: 4,
      width: 1
    },
    shadowOpacity: .1
  },
  sectionEmphasis: {
    backgroundColor: '#d88d13',
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      height: 4,
      width: 1
    },
    shadowOpacity: .5,
  },
  inputContainer: {
  },
  input: {
  },
  btnContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  btn: {
    padding: 10,
  },
  saveBtn: {
    padding: 10,
    alignItems: 'center'
  }
});
