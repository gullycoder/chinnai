import { BASE_URL } from "@env";


const checkVerification = async (phoneNumber, Otp) => {
    try {
        const data = JSON.stringify({
            to: phoneNumber,
            code: Otp,
        });

        const response = await fetch(`${BASE_URL}/check-verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });

        const json = await response.json();
        return json.success;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const sendSmsVerification = async (phoneNumber) => {
    try {
        const data = JSON.stringify({
            to: phoneNumber,
            channel: "sms",
        });

        const response = await fetch(`${BASE_URL}/start-verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });

        const json = await response.json();
        return json.success;
    } catch (error) {
        console.error(error);
        return false;
    }
};

module.exports = {
    sendSmsVerification,
    checkVerification,
};
