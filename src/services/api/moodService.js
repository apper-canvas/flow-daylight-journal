import { toast } from 'react-toastify';

const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const moodService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "value" } },
          { field: { Name: "emoji" } },
          { field: { Name: "color" } }
        ]
      };
      
      const response = await apperClient.fetchRecords('mood', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching moods:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getByValue(value) {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "value" } },
          { field: { Name: "emoji" } },
          { field: { Name: "color" } }
        ],
        where: [
          {
            FieldName: "value",
            Operator: "EqualTo",
            Values: [value]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('mood', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return (response.data && response.data.length > 0) ? response.data[0] : null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching mood with value ${value}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
};