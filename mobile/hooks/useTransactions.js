//react custom hook file

import { useCallback } from "react";
import { useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  //fetching Transaction details from the user
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error in fetching transactions : ", error);
    }
  }, [userId]);

  //fetching Summary details from the user
  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error in Summary transactions: ", error);
    }
  }, [userId]);

  //fetching Loading details from the user
  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error in Loading the data: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransactions = async (id) => {
    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error("Error Ouccured in deleteing the transaction");

      loadData();
      Alert.alert("Success", "The transaction is deleted Successfully");
    } catch (error) {
      console.error("Failed to delete the transacation: ", error);
      Alert.alert("Error", error.message);
    }
  };
  return { transactions, summary, isLoading, loadData, deleteTransactions };
};
