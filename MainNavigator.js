import * as React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import SearchJobsScreen from './src/screens/workeronly/SearchJobsScreen';
import GroupsScreen from './src/screens/groups/GroupsScreen';
import JobDetailsScreen from './src/screens/workeronly/JobDetailsScreen';
import JobAppliedScreen from './src/screens/workeronly/JobAppliedScreen';
import MyJobsScreen from './src/screens/workeronly/MyJobsScreen';
import ChangeJobTypesScreen from './src/screens/workeronly/ChangeJobTypesScreen';
import PublicProfileScreen from './src/screens/groups/PublicProfileScreen';
import CreateFeedScreen from './src/screens/groups/CreateFeedScreen';
import ViewPostScreen from './src/screens/groups/ViewPostScreen';
import SelectUserTypeScreen from './src/screens/card/SelectUserTypeScreen';
import BeginCardScreen from './src/screens/card/BeginCardScreen';
import CreateEditCardScreen from './src/screens/card/CreateEditCardScreen';
import TendersScreen from './src/screens/contractoronly/TendersScreen';
import TenderDetailsScreen from './src/screens/contractoronly/TenderDetailsScreen';
import TenderSubmittedScreen from './src/screens/contractoronly/TenderSubmittedScreen';
import MyTendersScreen from './src/screens/contractoronly/MyTendersScreen';
import CardScreen from './src/screens/card/CardScreen';
import PostJobsScreen from './src/screens/contractoronly/PostJobsScreen';
import SelectRemoveGroupsScreen from './src/screens/groups/SelectRemoveGroupsScreen';
import MyChatsScreen from './src/screens/card/MyChatsScreen';
import PhoneScreen from './src/screens/Auth/PhoneScreen';
import OtpScreen from './src/screens/Auth/OtpScreen';
import PastTendersScreen from './src/screens/card/PastTendersScreen';
import CreateJobScreen from './src/screens/contractoronly/CreateJobScreen';
import ReviewJobScreen from './src/screens/contractoronly/ReviewJobScreen';
import PostedJobDetailsScreen from './src/screens/contractoronly/PostedJobDetailsScreen';
import EligibilityCheckScreen from './src/screens/workeronly/EligibilityCheckScreen';
import EligibilityFailedScreen from './src/screens/workeronly/EligibilityFailedScreen';
import CreateTenderScreen from './src/screens/contractoronly/CreateTenderScreen';
import ReviewTenderScreen from './src/screens/contractoronly/ReviewTenderScreen';
import MyBidDetailsScreen from './src/screens/contractoronly/MyBidDetailsScreen';
import Header from './src/components/header/Header';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes } from './src/context/DesignSystem';
import ChangeTenderTypesScreen from './src/screens/contractoronly/ChangeTenderTypesScreen';
import SplashScreen from './src/screens/Auth/SplashScreen';
import SettingsScreen from './src/screens/card/SettingsScreen';
import AddPastTenderScreen from './src/screens/card/AddPastTenderScreen';


const MainStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="PhoneScreen" component={PhoneScreen} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
        </Stack.Navigator>
    );
};
const IncompleteRegistrationStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerTintColor: 'white',
        }}>
            <Stack.Screen
                name="SelectUserTypeScreen"
                component={SelectUserTypeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BeginCardScreen"
                component={BeginCardScreen}
                options={{
                    title: 'Chinaai',
                }}
            />
            <Stack.Screen
                name="CreateEditCardScreen"
                component={CreateEditCardScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const CardStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerTintColor: 'white',
        }}>
            <Stack.Screen
                name="CardScreen"
                component={CardScreen}
                options={{ headerTitle: () => <Header title="Card" />, headerTitleAlign: "left" }}
            />
            <Stack.Screen name="CreateEditCardScreen" component={CreateEditCardScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen}
                options={{
                    title: 'Settings',
                }} />
            <Stack.Screen name="MyChatsScreen" component={MyChatsScreen}
                options={{
                    title: 'My chats',
                }} />
            <Stack.Screen name="PastTendersScreen" component={PastTendersScreen}
                options={{
                    title: 'My tenders',
                }}
            />
            <Stack.Screen name="AddPastTenderScreen" component={AddPastTenderScreen}
                options={{
                    title: 'Add your past tender',
                }}
            />
        </Stack.Navigator>
    );
};

const SearchJobsStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: "left",
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTintColor: 'white',
            }}
        >
            <Stack.Screen
                name="SearchJobsScreen"
                component={SearchJobsScreen}
                options={{
                    headerTitle: () => <Header title="Jobs" />,
                }}
            />
            <Stack.Screen
                name="JobDetailsScreen"
                component={JobDetailsScreen}
                options={{
                    title: 'Job details',
                    headerTitleStyle: {
                        fontSize: textStyles.heading1.fontSize,
                    },
                }}
            />
            <Stack.Screen name="JobAppliedScreen" component={JobAppliedScreen}
                options={{
                    title: '',
                }} />
            <Stack.Screen
                name='MyJobsScreen'
                component={MyJobsScreen}
                options={{
                    title: 'Applied jobs',
                    headerTitleStyle: {
                        fontSize: textStyles.heading1.fontSize,
                    },
                }}
            />
            <Stack.Screen name="ChangeJobTypesScreen" component={ChangeJobTypesScreen}
                options={{
                    title: 'Change job types',
                }}
            />
            <Stack.Screen name="EligibilityCheckScreen" component={EligibilityCheckScreen}
                options={{
                    title: '',
                }} />
            <Stack.Screen name="EligibilityFailedScreen" component={EligibilityFailedScreen}
                options={{
                    title: '',
                }} />
        </Stack.Navigator>
    );
};

const GroupsStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerTintColor: 'white',
        }}>
            <Stack.Screen
                name="GroupsScreen"
                component={GroupsScreen}
                options={{
                    headerTitle: () => <Header title="Groups" />, headerTitleAlign: "left",
                }}
            />
            <Stack.Screen name="SelectRemoveGroupsScreen" component={SelectRemoveGroupsScreen}
                options={{
                    title: 'Select groups',
                }}
            />
            <Stack.Screen name="PublicProfileScreen" component={PublicProfileScreen}
                options={{
                    title: 'Card',
                }}
            />
            <Stack.Screen name="CreateFeedScreen" component={CreateFeedScreen}
                options={{
                    title: 'Create post',
                }} />
            <Stack.Screen name="ViewPostScreen" component={ViewPostScreen}
                options={{
                    title: 'Post',
                }}
            />
        </Stack.Navigator>
    );
};

const TendersStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerTintColor: 'white',
        }}>
            <Stack.Screen
                name="TendersScreen"
                component={TendersScreen}
                options={{ headerTitle: () => <Header title="Tenders" />, headerTitleAlign: "left" }}
            />
            <Stack.Screen name="TenderDetailsScreen" component={TenderDetailsScreen}
                options={{
                    title: 'Tender details',
                }} />
            <Stack.Screen name="TenderSubmittedScreen" component={TenderSubmittedScreen}
                options={{
                    title: 'Tender',
                }} />
            <Stack.Screen name="CreateTenderScreen" component={CreateTenderScreen}
                options={{
                    title: 'Create a tender',
                }} />
            <Stack.Screen name="ReviewTenderScreen" component={ReviewTenderScreen}
                options={{
                    title: 'Review tender',
                }} />
            <Stack.Screen name="MyBidDetailsScreen" component={MyBidDetailsScreen}
                options={{
                    title: 'Bid details',
                }} />
            <Stack.Screen name="MyTendersScreen" component={MyTendersScreen}
                options={{
                    title: 'Applied tenders',
                }} />
            <Stack.Screen name="ChangeTenderTypesScreen" component={ChangeTenderTypesScreen}
                options={{
                    title: 'Change tender types',
                }} />
        </Stack.Navigator>
    );
};
const PostJobsStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colors.primary,
            },
            headerTintColor: 'white',
        }}>
            <Stack.Screen
                name="PostJobsScreen"
                component={PostJobsScreen}
                options={{
                    headerTitle: () => <Header title="Hire" />,
                }}
            />
            <Stack.Screen name="CreateJobScreen" component={CreateJobScreen}
                options={{
                    title: 'Post a job',
                }} />
            <Stack.Screen name="ReviewJobScreen" component={ReviewJobScreen}
                options={{
                    title: 'Review job',
                }} />
            <Stack.Screen name="PostedJobDetailsScreen" component={PostedJobDetailsScreen}
                options={{
                    title: 'Job details',
                }} />
        </Stack.Navigator>
    );
};

const WorkerTab = () => {
    const tabBarDisplayStatus = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "GroupsScreen";
        switch (routeName) {
            case "SearchJobsScreen":
                return "flex";
            case "GroupsScreen":
                return "flex";
            case "CardScreen":
                return "flex";
            default:
                return "none";
        }
    };

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'SearchJobsStack') {
                        iconName = "work-outline";
                    } else if (route.name === 'GroupsStack') {
                        iconName = "workspaces-outline";
                    } else if (route.name === 'CardStack') {
                        iconName = "perm-identity";
                    }

                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.text,
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: textStyles.caption.fontSize,
                    fontWeight: "bold",
                },
            })}
        >
            <Tab.Screen
                name="SearchJobsStack"
                component={SearchJobsStack}
                options={({ route }) => ({
                    tabBarLabel: "Jobs",
                    tabBarStyle: {
                        display: tabBarDisplayStatus(route),
                    },
                })}
            />
            <Tab.Screen
                name="GroupsStack"
                component={GroupsStack}
                options={({ route }) => ({
                    tabBarLabel: "Groups",
                    tabBarStyle: {
                        display: tabBarDisplayStatus(route),
                    },
                })}
            />
            <Tab.Screen name="CardStack" component={CardStack} options={{ tabBarLabel: 'Card' }} />
        </Tab.Navigator>
    );
};
const ContractorTab = () => {
    const tabBarDisplayStatus = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "GroupsScreen";
        switch (routeName) {
            case "TendersScreen":
                return "flex";
            case "GroupsScreen":
                return "flex";
            case "CardScreen":
                return "flex";
            case "PostJobsScreen":
                return "flex";
            default:
                return "none";
        }
    };
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'PostJobsStack') {
                        iconName = "post-add";
                    } else if (route.name === 'GroupsStack') {
                        iconName = "workspaces-outline";
                    } else if (route.name === 'CardStack') {
                        iconName = "perm-identity";
                    } else if (route.name === 'TendersStack') {
                        iconName = "business-center";
                    }

                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.text,
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: textStyles.caption.fontSize,
                    fontWeight: "bold",
                },
                initialRouteName: "GroupsStack",

            })}
        >
            <Tab.Screen
                name="TendersStack"
                component={TendersStack}
                options={({ route }) => ({
                    tabBarLabel: "Tenders",
                    tabBarStyle: {
                        display: tabBarDisplayStatus(route),
                    },
                })}
            />
            <Tab.Screen
                name="GroupsStack"
                component={GroupsStack}
                options={({ route }) => ({
                    tabBarLabel: "Groups",
                    tabBarStyle: {
                        display: tabBarDisplayStatus(route),
                    },
                })}
            />
            <Tab.Screen
                name="PostJobsStack"
                component={PostJobsStack}
                options={({ route }) => ({
                    tabBarLabel: "Hire",
                    tabBarStyle: {
                        display: tabBarDisplayStatus(route),
                    },
                })}
            />
            <Tab.Screen
                name="CardStack"
                component={CardStack}
                options={({ route }) => ({
                    tabBarLabel: "Card",
                    tabBarStyle: {
                        display: tabBarDisplayStatus(route),
                    },
                })}
            />
        </Tab.Navigator>
    );
};

const MainNavigator = () => {
    return (
        <MainStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <MainStack.Screen name="AuthStack" component={AuthStack} />
            <MainStack.Screen name="IncompleteRegistrationStack" component={IncompleteRegistrationStack} />
            <MainStack.Screen name="ContractorTab" component={ContractorTab} />
            <MainStack.Screen name="WorkerTab" component={WorkerTab} />
        </MainStack.Navigator>
    );
};

export default MainNavigator;