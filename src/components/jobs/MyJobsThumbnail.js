import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import * as Linking from 'expo-linking';

const MyJobsThumbnail = ({ job, candidate, navigation }) => {

    const callPhoneNumber = () => {
        Linking.openURL(`tel:${job.phone}`);
    }
    const sendWhatsappMessage = () => {
        try {
            const message = `Hi ${job.userName}, I am interested in your job for ${job.jobType} posted on Chinaai App.`;
            Linking.openURL(`whatsapp://send?text=${message}&phone=${job.phone}`);
            console.log('whatsapp message sent');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TouchableOpacity onPress={() => navigation.navigate('JobDetailsScreen', { jobId: job.jobId })}>
            <View style={styles.job}>
                <Text style={styles.title}>{job.jobType}</Text>
                {job.jobSalary && <Text style={styles.title}>Monthly Salae: {job.jobSalary}</Text>}
                {job.jobDailyWageRate && <Text style={styles.title}>Daily Wage Rate: {job.jobDailyWageRate}</Text>}
                <Text style={styles.title}>{job.userCompanyName}</Text>
                <Text style={styles.title}>{job.jobCity}</Text>
                {job.jobOpenings && <Text style={styles.title}>{job.jobOpenings}</Text>}
                {candidate && <Text style={styles.title}>{candidate.candidateStatus}</Text>}
                <Button
                    title="Call"
                    onPress={() => callPhoneNumber()}
                />
                <Button
                    title="Message"
                    onPress={() => sendWhatsappMessage()}
                />
            </View>
        </TouchableOpacity>
    )
}

export default MyJobsThumbnail

const styles = StyleSheet.create({})