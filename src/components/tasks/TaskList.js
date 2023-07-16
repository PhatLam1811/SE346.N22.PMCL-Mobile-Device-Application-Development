/* eslint-disable*/

import React, { useState, useEffect } from 'react';
import Task from './Task';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Button,
    Clipboard
} from 'react-native';

import {
    TextInput, IconButton,
} from '@react-native-material/core';
import Icon from "react-native-vector-icons/Octicons";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import TaskModel from '../../classes/Task.js';
import AppColors from '../../utils/AppColors.js';

const CopyNoteHandler = (item) => {
    console.log("Copy Note");
    Clipboard.setString(item);

}
const supportedURL = 'https://google.com/search?q=';


const WebSearch = async (item) => {
    // Checking if the link is supported for links with custom URL scheme.
    let valueINeed = (supportedURL + item);
    console.log(valueINeed);
    //const supported = await Linking.canOpenURL(valueINeed);


    console.log(supported);
    await Linking.openURL(valueINeed);


};

const TaskList = (props) => {
    const [task, setTask] = useState();
    const [taskItems, setTaskItems]
        = useState(props.taskItems);
    const _retrieveData = async () => {
        console.log("im retrieving...");

        //const names = await GetAllNoteAction();
        // if (names.result === 'success') {
        //     console.log(names.data);
        //     setTaskItems(names.data);
        // }

    }

    const completeTask = async (index) => {
        console.log('called');
        let itemsCopy = [...taskItems];
        itemsCopy[index].isFinished = !itemsCopy[index].isFinished;
        setTaskItems(itemsCopy);

    }
    const deleteTask = async (index) => {
        console.log('called');
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);

    }
    const HandleAddTask = async () => {
        setTaskItems([...taskItems, new TaskModel(task, false)]);

        console.log('taskItems before change:' + JSON.stringify(taskItems));
        //const saveData = await SaveNoteAction(itemsCopy);

        //Keyboard.dismiss();
        //setTaskItems([...taskItems, task]);
        //props.setTaskItems([...taskItems,task]);

        setTask(null);

    };

    useEffect(() => {
        //props.taskItems = taskItems;
        console.log('taskItems after change:' + JSON.stringify(props.taskItems));

         props.onTaskChange(taskItems);
        console.log('taskItems after change:' + JSON.stringify(props.taskItems));

        console.log('set items');
    }, [taskItems]);

    const screenNavigation = (ID) => {
        props.navigation.navigate('Detail', {
            ID: ID,
            onGoBack: () => _retrieveData(),
        });
    }



    return (
        <View >
           
            <View>
                <TextInput
                    style={{}}
                    label='Add task'
                    placeholder={'Write a task'}
                    value={task}
                    onChangeText={text => {
                        setTask(text);
                    }}
                    variant="outlined"
                    trailing={
                        props => (
                            <IconButton
                                onPress={HandleAddTask}
                                icon={props => <Icon name="plus" {...props} />} {...props}

                            />
                        )}
                />
            </View>

            <View style={styles.items}>
                {

                    taskItems.map((item, index) => {


                        return (
                            <View>
                                <Menu key={index} >
                                    <MenuTrigger triggerOnLongPress
                                        onAlternativeAction={() => completeTask(index)}
                                        customStyles={{
                                            TriggerTouchableComponent: TouchableOpacity,
                                            triggerWrapper: styles.noteCard,
                                        }}>
                                        {
                                            <Task isFinished={item.isFinished} text={item.toDo} />
                                        }
                                    </MenuTrigger>

                                    <MenuOptions style={styles.noteCard_popupMenu}>
                                        <Text style={styles.popupMenu_title}>{item.toDo}</Text>
                                        <MenuOption customStyles={styles.popupMenu_options} onSelect={props.setVisible} value={index} text="Edit Item" />
                                        <MenuOption customStyles={styles.popupMenu_options} onSelect={WebSearch} value={item.toDo} text="Web Search" />
                                        <MenuOption customStyles={styles.popupMenu_options} onSelect={CopyNoteHandler} value={item.toDo} text="Copy To Clipboard" />
                                        <MenuOption customStyles={styles.popupMenu_options} onSelect={deleteTask} value={index} text="Delete Note" />
                                    </MenuOptions>
                                </Menu >


                            </View>

                        )
                    })

                }
            </View>
        </View >
    );
};


const styles = StyleSheet.create({
    items: {
        //marginTop: 30
    },

    taskContent: {
        height: "100%",
        flex: 1,
        backgroundColor: "transparent",
        marginHorizontal: "3%",
    },
    noteCard: {
        flexDirection: "column",
        backgroundColor: AppColors.secondaryDark,
        color: AppColors.textDark,
        width: "100%",
        height: "auto",
        marginBottom: "5%",
        borderRadius: 10,
    },

    noteCard__image: {
        width: "100%",
        aspectRatio: 3 / 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    noteCard__content: {
        flexDirection: "column",
        padding: 10,
    },

    noteCard_title: {
        color: AppColors.textDark,
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 10,
    },

    noteCard_subTitle: {
        color: AppColors.textDark,
        flexWrap: "wrap",
        marginBottom: 10,
    },

    noteCard_lastUpdated: {
        color: AppColors.textDark,
        fontSize: 10,
    },

    noteCard_popupMenu: {
        backgroundColor: AppColors.secondaryDark,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "flex-start",
        height: 190,
    },

    popupMenu_title: {
        color: "#fcba03",
        padding: 10,
    },

    popupMenu_options: {
        optionWrapper: {
            width: "100%",
            paddingVertical: 10,
            paddingHorizontal: 0,
        },
        optionText: {
            color: AppColors.textDark,
            paddingHorizontal: 10,
        },
    },



});

export default TaskList;
