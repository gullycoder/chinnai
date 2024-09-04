import { FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import { JobsContext } from '../../context/JobsContext';
import { MaterialIcons } from '@expo/vector-icons';
import JobThumbnail from '../../components/jobs/JobThumbnail';
import { colors, spacings, textStyles, iconSizes } from '../../context/DesignSystem';

const MyJobsScreen = ({ navigation }) => {
    const { jobs, candidates } = useContext(JobsContext);

    const myAppliedJobs = jobs.filter(job => {
        return candidates.filter(candidate => candidate.jobId === job.jobId && candidate.candidateStatus === "applied").length > 0;
    });

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'SearchJobsScreen' }],
                        });
                    }}
                    style={{
                        marginRight: spacings.large * 2,
                    }}
                >
                    <MaterialIcons name="arrow-back" size={iconSizes.medium} color='white' />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);


    return (
        <View style={styles.listContainer}>
            <StatusBar backgroundColor={colors.primaryDark} />
            {myAppliedJobs.length > 0
                ? <FlatList
                    data={myAppliedJobs}
                    renderItem={({ item }) => (
                        <JobThumbnail
                            job={item}
                            candidate={candidates.find(candidate => candidate.jobId === item.jobId)}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={item => item.jobId.toString()}
                />
                : <Text style={styles.noJobsText}>You have not applied to any jobs yet.</Text>
            }
        </View>
    )
}

export default MyJobsScreen

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
    },
    noJobsText: {
        ...textStyles.heading1,
        textAlign: 'center',
        margin: spacings.large * 2,
    },




})