import { toast } from 'react-toastify';

const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const entryService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "date" } },
          { field: { Name: "content" } },
          { field: { Name: "mood" } },
          { field: { Name: "created_at" } },
          { field: { Name: "updated_at" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ],
        orderBy: [
          {
            fieldName: "date",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('entry', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching entries:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "date" } },
          { field: { Name: "content" } },
          { field: { Name: "mood" } },
          { field: { Name: "created_at" } },
          { field: { Name: "updated_at" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ]
      };
      
      const response = await apperClient.getRecordById('entry', parseInt(id), params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data || null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching entry with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async getByDate(date) {
    try {
      const apperClient = getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "date" } },
          { field: { Name: "content" } },
          { field: { Name: "mood" } },
          { field: { Name: "created_at" } },
          { field: { Name: "updated_at" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ],
        where: [
          {
            FieldName: "date",
            Operator: "EqualTo",
            Values: [date]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('entry', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return (response.data && response.data.length > 0) ? response.data[0] : null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching entry for date ${date}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async create(entryData) {
    try {
      const apperClient = getApperClient();
      const params = {
        records: [
          {
            Name: entryData.Name || `Entry for ${entryData.date}`,
            Tags: entryData.Tags || "",
            date: entryData.date,
            content: entryData.content,
            mood: entryData.mood || "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
      };
      
      const response = await apperClient.createRecord('entry', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating entry:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, entryData) {
    try {
      const apperClient = getApperClient();
      const params = {
        records: [
          {
            Id: parseInt(id),
            Name: entryData.Name || `Entry for ${entryData.date}`,
            Tags: entryData.Tags || "",
            date: entryData.date,
            content: entryData.content,
            mood: entryData.mood || "",
            updated_at: new Date().toISOString()
          }
        ]
      };
      
      const response = await apperClient.updateRecord('entry', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating entry:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async updateByDate(date, entryData) {
    try {
      const existingEntry = await this.getByDate(date);
      
      if (existingEntry) {
        return this.update(existingEntry.Id, { ...entryData, date });
      } else {
        return this.create({ ...entryData, date });
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating entry by date:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      const params = {
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord('entry', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting entry:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  },

  async search(query, startDate = null, endDate = null) {
    try {
      const apperClient = getApperClient();
      const whereConditions = [];
      
      if (startDate && endDate) {
        whereConditions.push({
          FieldName: "date",
          Operator: "GreaterThanOrEqualTo",
          Values: [startDate]
        });
        whereConditions.push({
          FieldName: "date",
          Operator: "LessThanOrEqualTo",
          Values: [endDate]
        });
      }
      
      if (query && query.trim()) {
        const searchTerm = query.toLowerCase();
        whereConditions.push({
          FieldName: "content",
          Operator: "Contains",
          Values: [searchTerm]
        });
      }
      
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "date" } },
          { field: { Name: "content" } },
          { field: { Name: "mood" } },
          { field: { Name: "created_at" } },
          { field: { Name: "updated_at" } },
          { field: { Name: "CreatedOn" } },
          { field: { Name: "ModifiedOn" } }
        ],
        where: whereConditions,
        orderBy: [
          {
            fieldName: "date",
            sorttype: "DESC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('entry', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching entries:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
};