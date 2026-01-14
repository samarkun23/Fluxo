
export function parse(text: string, value: any, startDelimeter = "{", endDelimeter = "}"){
    // you received {comment.amount} money from {comment.link}
    let startIndex = 0;
    let endIndex = 1;

    let finalString = "";
    while(endIndex < text.length){
        if (text[startIndex] === startDelimeter) {
            let endPoint = startIndex + 2;
            while(text[endPoint] !== endDelimeter){
                endPoint++;
            }
            // 
            let stringHoldingValue = text.slice(startIndex + 1, endPoint);
            const keys = stringHoldingValue.split(".");
            let localValues = {
                ...value
            }
            for (let i = 0; i < keys.length; i++) {
                if (typeof localValues === 'string'){
                    localValues = JSON.parse(localValues);
                }
                // TODO: Fix this issue 
                localValues = localValues[keys[i]!]
            }
            finalString += localValues;
            startIndex = endPoint + 1;
            endIndex = endPoint + 2;
        }else{
            finalString += text[startIndex]
            startIndex++;
            endIndex++;
        }
    }
    if(text[startIndex]){
        finalString += text[startIndex]
    }
    return finalString;
}