import { escapeRegExp } from "lodash";
import { unlink } from "fs";

//Helper function to extract all the valid Phrases from the input
//O(n) time complexity because only loop once through the input string
export function extractString(str: string): Array<string> | null {
    if (!str) return null;

    const newStr: String = str;

    const phrases: Array<string> = [];
    //Constants for diferent formats of single and doubles quotes
    const SINGLE_QUOTES = 39;
    const DOUBLE_QUOTES = 34;
    const DOUBLE_QUOTES_WITH_FORMAT_BEGIN = 8220;
    const DOUBLE_QUOTES_WITH_FORMAT_END = 8221;
    const SINGLE_QUOTES_WITH_FORMAT_BEGIN = 8216;
    const SINGLE_QUOTES_WITH_FORMAT_END = 8217;
    const SINGLE_QUOTES_BACK = 96;

    let i = 0;

    while (i < newStr.length) {
        //Find the double or the single quotes by their dec number
        //34 for the double quotes or 39 for the single quotes
        switch (newStr.charCodeAt(i)) {
            case SINGLE_QUOTES: {
                i = exractStringAux(i, newStr, SINGLE_QUOTES, phrases);
                break;
            }
            case DOUBLE_QUOTES: {
                i = exractStringAux(i, newStr, DOUBLE_QUOTES, phrases);
                break;
            }
            case DOUBLE_QUOTES_WITH_FORMAT_BEGIN: {
                i = exractStringAux(i, newStr, DOUBLE_QUOTES_WITH_FORMAT_END, phrases);
                break;
            }
            case SINGLE_QUOTES_WITH_FORMAT_BEGIN: {
                i = exractStringAux(i, newStr, SINGLE_QUOTES_WITH_FORMAT_END, phrases);
                break;
            }
            case SINGLE_QUOTES_BACK: {
                i = exractStringAux(i, newStr, SINGLE_QUOTES_BACK, phrases);
                break;
            }
            default:
                i++;
        }
    }

    return phrases;
}
//Refactoring the code
//Auxiliar function for extract string
function exractStringAux(i: number, newStr: String, quotesTypes: number, phrases: Array<string>): number {
    i++;

    if (newStr[i]) {
        let stringBuilder: String = "";

        while (i < newStr.length && newStr.charCodeAt(i) !== quotesTypes) {
            stringBuilder += newStr[i];
            i++;
        }
        //if it did not found the final single quote
        //Reset the variable
        if (newStr.charCodeAt(i) === quotesTypes) {
            phrases.push(stringBuilder.toString());
            stringBuilder = "";
            i++;
        } else stringBuilder = "";
    }
    return i;
}

//Replace the given string with a given mask char and return the X's string
//Ready to replace in the document
export function replaceString(str: string, char: string): string {
    const newStr: Array<string> = str.split("");

    for (let i = 0; i < newStr.length; i++) if (newStr[i] !== " ") newStr[i] = char;

    newStr.push(" ");
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
        escapedExpression = `\.?\,?${escapedExpression}\.?\,?`;

        let regExp = new RegExp(escapedExpression, "gi");
        newDocument = newDocument.replace(regExp, replaceString(expression, "X"));
    }

    return newDocument;
}

export async function unlinkDocument(path: string): Promise<void> {
    unlink(path, (err) => {
        if (err) throw err;
    });
}
