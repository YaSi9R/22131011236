import axios from "axios";

let accessToken = null;

const AUTH_URL = "http://20.244.56.144/evaluation-service/auth";
const LOG_URL = "http://20.244.56.144/evaluation-service/logs";

const AUTH_PAYLOAD = {
  email: "mohd.22scse1011234@galgotiasuniversity.edu.in",
  name: "mohd yasir",
  rollNo: "22131011236",
  accessCode: "Muagvq",
  clientID: "c86f9c62-ec1d-4126-9fc9-4c6191ee707b",
  clientSecret: "qdNMqHXunkzPumUs"
};

const getAuthToken = async () => {
  if (accessToken) return accessToken;
  try {
    const res = await axios.post(AUTH_URL, AUTH_PAYLOAD);
    accessToken = res.data.access_token;
    return accessToken;
  } catch (err) {
    console.error("Auth error:", err.message);
    return null;
  }
};

export  const logEvent = async (stack, level, pkg, message) => {
  const validStacks = ["frontend"];
  const validLevels = ["debug", "info", "warn", "error", "fatal"];
  const validPackages = [
    "api", "component", "hook", "page", "state", "style",
    "auth", "config", "middleware", "utils"
  ];

  if (
    !validStacks.includes(stack) ||
    !validLevels.includes(level) ||
    !validPackages.includes(pkg)
  ) {
    console.error("Invalid log structure");
    return;
  }

  const token = await getAuthToken();
  if (!token) return;

  try {
    await axios.post(
      LOG_URL,
      { stack, level, package: pkg, message },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    console.error("Log failed:", err.message);
  }
};

