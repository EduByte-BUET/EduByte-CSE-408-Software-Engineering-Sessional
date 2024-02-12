import React, { useEffect } from 'react';
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const MODEL_NAME = 'gemini-pro';
const API_KEY = 'MY_API_KEY';

const Ex: React.FC = () => {
  useEffect(() => {
    const run = async () => {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };

      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];

    //   const parts = [
    //     {text: "question exam question will be provides"},
    //     {text: "user_answer user answer will be provided"},
    //     {text: "corrected_answer based on provided question .generate correct answer. show the correct answer in short."},
    //     {text: "obtained_mark your job is to match user answer with corrected answer. If correct answer is missing then generate correct answer from the question then compare. If they match give mark 1,If not mark 0. precisely match the user answer with correct answers"},
    //     {text: "comment if mark 1 then comment pass, if comment 0 then mark fail."},
    //     {text: "question Implement a function in Python to check if a string is a palindrome."},
    //     {text: "user_answer public class PalindromeChecker {\n    public static boolean isPalindrome(String s) {\n        String cleanString = s.replaceAll(\"[^a-zA-Z0-9]\", \"\").toLowerCase();\n        return cleanString.equals(new StringBuilder(cleanString).reverse().toString());\n    }\n}"},
    //     {text: "corrected_answer def is_palindrome(s): return s == s[::-1]"},
    //     {text: "obtained_mark 1"},
    //     {text: "comment pass"},
    //     {text: "question A byte consists of 8 bits.Answer with either 'True' or 'False'."},
    //     {text: "user_answer True"},
    //     {text: "corrected_answer True"},
    //     {text: "obtained_mark 1"},
    //     {text: "comment pass"},
    //     {text: "question Create a JavaScript function to find the maximum number in an array."},
    //     {text: "user_answer function findMax(arr) {\n    return arr.length ? arr.reduce((max, value) => (value > max ? value : max), arr[0]) : undefined;\n}"},
    //     {text: "corrected_answer "},
    //   ];

      const parts = [
        {text: "question What is the capital of France?"},
        {text: "user_answer Paris"},
        {text: "corrected_answer "},
        {text: "obtained_mark "},
        {text: "comment "},
        {text: "question Write a JavaScript function to reverse a string."},
        {text: "user_answer function reverseString(str) { return str.split('').reverse().join(''); }"},
        {text: "corrected_answer "},
        {text: "obtained_mark "},
        {text: "comment "},
      ];

      const result = await model.generateContent({
        contents: [{ role: 'user', parts}],
        generationConfig,
        safetySettings,
      });

      const response = result.response;
      console.log(response);
    };

    run();
  }, []);

  return <div>App</div>;
};

export default Ex;