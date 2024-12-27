"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arraysEqual = exports.capitalizeFirstLetter = exports.decryptData = exports.getHasFollowed = exports.stripHtml = exports.getFilenameAndExtension = exports.formatDateLong = exports.timeAgo = exports.truncateString = exports.formatDateShort = void 0;
exports.isWithinLast10Minutes = isWithinLast10Minutes;
exports.getTime = getTime;
exports.sanitizeFile = sanitizeFile;
exports.serializeData = serializeData;
exports.formatErrorResponse = formatErrorResponse;
const crypto_js_1 = __importDefault(require("crypto-js"));
const formatDateShort = (dateString, { monthType, weekdayType }) => {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleString("en-US", { weekday: weekdayType });
    const day = date.getDate().toString();
    const month = date.toLocaleString("en-US", { month: monthType });
    return { dayOfWeek, day, month };
};
exports.formatDateShort = formatDateShort;
const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
    }
    return str;
};
exports.truncateString = truncateString;
const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const timeIntervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
    };
    if (diffInSeconds >= timeIntervals.year) {
        const years = Math.floor(diffInSeconds / timeIntervals.year);
        return years > 1 ? `${years} years ago` : "1 year ago";
    }
    else if (diffInSeconds >= timeIntervals.month) {
        const months = Math.floor(diffInSeconds / timeIntervals.month);
        return months > 1 ? `${months} months ago` : "1 month ago";
    }
    else if (diffInSeconds >= timeIntervals.day) {
        const days = Math.floor(diffInSeconds / timeIntervals.day);
        return days > 1 ? `${days} days ago` : "1 day ago";
    }
    else if (diffInSeconds >= timeIntervals.hour) {
        const hours = Math.floor(diffInSeconds / timeIntervals.hour);
        return hours > 1 ? `${hours} hours ago` : "1 hour ago";
    }
    else if (diffInSeconds >= timeIntervals.minute) {
        const minutes = Math.floor(diffInSeconds / timeIntervals.minute);
        return minutes > 1 ? `${minutes} mins ago` : "1 min ago";
    }
    else {
        return "Just now";
    }
};
exports.timeAgo = timeAgo;
const formatDateLong = (dateString) => {
    const date = new Date(dateString);
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    const day = date.getDate();
    const suffix = ["th", "st", "nd", "rd"][day % 10 < 4 ? day % 10 : 0] || "th";
    const dayWithSuffix = `${day}${suffix}`;
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12;
    const time = `${hour12}:${minutes}${ampm}`;
    return `${dayOfWeek}, ${dayWithSuffix} ${month}, ${year} ${time}`;
};
exports.formatDateLong = formatDateLong;
const getFilenameAndExtension = (url) => {
    const pathname = new URL(url).pathname;
    const filenameWithExt = pathname.substring(pathname.lastIndexOf("/") + 1);
    const dotIndex = filenameWithExt.lastIndexOf(".");
    const filename = filenameWithExt.substring(0, dotIndex);
    const extension = filenameWithExt.substring(dotIndex + 1);
    return filename + "." + extension;
};
exports.getFilenameAndExtension = getFilenameAndExtension;
const stripHtml = (html) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
};
exports.stripHtml = stripHtml;
const getHasFollowed = (connections, followingProfileId) => {
    return (connections.following || [])
        .map((following) => {
        return following.profile_id;
    })
        .includes(followingProfileId);
};
exports.getHasFollowed = getHasFollowed;
const decryptData = (encryptedData, iv, key) => {
    try {
        const parsedKey = crypto_js_1.default.enc.Hex.parse(key);
        const parsedIv = crypto_js_1.default.enc.Hex.parse(iv);
        const encryptedWordArray = crypto_js_1.default.enc.Hex.parse(encryptedData);
        const cipherParams = crypto_js_1.default.lib.CipherParams.create({
            ciphertext: encryptedWordArray,
        });
        const decrypted = crypto_js_1.default.AES.decrypt(cipherParams, parsedKey, {
            iv: parsedIv,
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.Pkcs7,
        });
        const decryptedText = decrypted.toString(crypto_js_1.default.enc.Utf8);
        if (!decryptedText) {
            throw new Error("Failed to decrypt data or invalid UTF-8 output");
        }
        return JSON.parse(decryptedText);
    }
    catch (error) {
        console.error("Decryption error:", error.message);
        return null;
    }
};
exports.decryptData = decryptData;
function isWithinLast10Minutes(lastSeen) {
    const now = new Date();
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
    return lastSeen >= tenMinutesAgo;
}
function getTime(date) {
    const neDate = new Date(date);
    const formattedTime = neDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });
    return formattedTime;
}
function sanitizeFile(file) {
    const sanitizedFile = new File([file], file.name.replace(/\s+/g, "_"), {
        type: file.type,
    });
    return sanitizedFile;
}
function serializeData(data) {
    const serializedData = { ...data };
    Object.keys(serializedData).forEach((key) => {
        const value = serializedData[key];
        if (value === null || value === undefined || value === "") {
            serializedData[key] = null;
        }
    });
    return serializedData;
}
function formatErrorResponse(error) {
    const errorResponse = error.response?.data?.error;
    if (Array.isArray(errorResponse)) {
        return errorResponse[0];
    }
    if (typeof errorResponse === "string") {
        return errorResponse;
    }
    if (error.message)
        return error.message;
    return "An error occurred while processing your request. Please try again later.";
}
const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);
exports.capitalizeFirstLetter = capitalizeFirstLetter;
const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length)
        return false;
    const set1 = new Set(arr1);
    return arr2.every((item) => set1.has(item));
};
exports.arraysEqual = arraysEqual;
//# sourceMappingURL=index.js.map