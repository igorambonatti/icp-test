import { HttpAgent } from "@dfinity/agent";

export const createICPAgent = async () => {
  try {
    const agent = await HttpAgent.create({ host: "https://ic0.app" });

    return agent;
  } catch (error) {
    console.error("Failed to create ICP Agent:", error);
    throw error;
  }
};
