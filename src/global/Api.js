import React from 'react';
import axios from 'axios';

export async function getUserUUID() {
    try {
        const path = "http://limitlessstorage.somee.com/api/user/key";
        const response = await axios.get(path);
        return response.data;
    }
    catch (ex) {
        console.log("Error at : getUserUUID()");
        console.log(ex);
        return "NO";
    }
}

export async function createUser(ukey, root, plan, startDate, endDate, billState, collectionId, capacity) {

    try {
        const formData = new FormData();

        const data = {
            "UserKey": ukey,
            "UserFolder": root,
            "UserPlan": plan,
            "UserPlanStartDate": startDate,
            "UserPlanEndDate": endDate,
            "UserBillState": billState,
            "UserCurrentCapacity": capacity,
            "UserCollectionId": collectionId
        }

        formData.append("user-data", JSON.stringify(data));

        const path = "http://limitlessstorage.somee.com/api/user/register";
        const response = await axios.post(path, formData, {
            headers: { "Content-Type": "application/json" }
        });
        return 'YES';
    }
    catch (err) {
        return 'NO';
    }
}