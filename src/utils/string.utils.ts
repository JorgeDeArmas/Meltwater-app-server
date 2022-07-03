import { escapeRegExp } from "lodash";

//Helper function to extract all the valid Phrases from the input
//O(n) time complexity because only loop once through the input string
export function extractString(str: string): Array<string> | null {
  if (!str) return null;

  const newStr: String = str;

  const phrases: Array<string> = [];

  const SINGLE_QUOTES = 39;
  const DOUBLE_QUOTES = 34;

  let i = 0;

  while (i < newStr.length) {
    //Find the double quotes  or the single quotes by their dec number
    //34 for the double quotes or 39 for the single quotes
    switch (newStr.charCodeAt(i)) {
      case SINGLE_QUOTES: {
        i++;

        if (newStr[i]) {
          let stringBuilder: String = "";

          while (i < newStr.length && newStr.charCodeAt(i) !== SINGLE_QUOTES) {
            stringBuilder += newStr[i];
            i++;
          }
          //if it did not found the final single quote
          //Reset the variable
          if (i >= newStr.length) stringBuilder = "";
          else {
            phrases.push(stringBuilder.toString());
            stringBuilder = "";
            i++;
          }
        }
      }
      case DOUBLE_QUOTES: {
        i++;

        if (newStr[i]) {
          let stringBuilder: String = "";

          while (i < newStr.length && newStr.charCodeAt(i) !== DOUBLE_QUOTES) {
            stringBuilder += newStr[i];
            i++;
          }
          //if it did not found the final single quote
          if (i >= newStr.length) stringBuilder = "";
          else {
            phrases.push(stringBuilder.toString());
            stringBuilder = "";
            i++;
          }
        }
      }
      default:
        i++;
    }
  }
  return phrases;
}

//Replace the given string with a given mask char and return the X's string
//Ready to replace in the document
export function replaceString(str: string, char: string): string {
  const newStr: Array<string> = str.split("");

  for (let i = 0; i < newStr.length; i++) if (newStr[i] !== " ") newStr[i] = char;

  return newStr.join("");
}

//Find all the matching prhases and replace them all with a given char
export function matchString(keywords: string | null, document: string): string | null {
  if (!keywords) return null;

  const expressions: Array<string> | null = extractString(keywords);

  if (!expressions) return null;

  let newDocument = document;
  let escapedExpression = "";

  for (let expression of expressions) {
    escapedExpression = escapeRegExp(expression);

    let regExp = new RegExp(escapedExpression, "g");

    newDocument = newDocument.replace(regExp, replaceString(expression, "X"));
  }

  return newDocument;
}
