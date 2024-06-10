function mySubmit(){
    let protoWord = document.getElementById("myText").value;

    // Categories
    const S = ['p', 't', 'k', 'c' , 'ʔ'];
    const D = ['b', 'd', 'g'];
    const F = ['ɸ', 's', 'ç', 'ʃ', 'x', 'h', 'z', 'ʒ', 'ß'];
    const N = ['n', 'ŋ', 'm'];
    const L = ['j', 'l', 'r', 'ʋ', 'w'];
    const P = ['p', 'b', 'ɸ', 'ʋ', 'm']
    const E = ['a', 'i', 'e'];
    const B = ['u', 'o'];
    const O = [...S, ...F];
    const C = [...S, ...F, ...N, ...L];
    const V = [...E, ...B];
    
    const X = ["'", ".", ":"];

      

    function replaceSubstring(index, length, replacementChar) {
        protoWord = protoWord.substring(0, index) + replacementChar + protoWord.substring(index + length);
    }
    

    let prevChar = ''; // Initialize prevChar outside the loop

    // Iterate through the protoWord
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];


        // Rule 1: V → Ø / O_L(VCVC)'V
        if ((V.includes(char) && O.includes(prevChar) && L.includes(nextChar) && nextNextChar === "'") ||
            (V.includes(char) && O.includes(prevChar) && L.includes(nextChar) && V.includes(nextNextChar) && C.includes(protoWord[i + 3]) && V.includes(protoWord[i + 4]) && C.includes(protoWord[i + 5]) && protoWord[i + 6] === "'")) {
            replaceSubstring(i, 1, '');
        }
    }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];

        // Rule 2: hr {hl,tl} hj → r: l: j:
        if (char === 'r' && prevChar === 'h')  {
                replaceSubstring(i-1, 2, 'r:');
        }
        if ((char === 'l' && prevChar === 'h') ||
        (char === 'l' && prevChar === 't'))  {
            replaceSubstring(i-1, 2, 'l:');
        }   
        if (char === 'j' && prevChar === 'h')  {
            replaceSubstring(i-1, 2, 'j:');
        }
    
            prevChar = char;
        }

        
    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 3: ʃ → ç / _B
        if ((char === 'ʃ' && B.includes(nextChar)) ||
            (char === 'ʃ' && nextChar === "'" && B.includes(nextNextChar))) {
                replaceSubstring(i, 1, "ç");
        }

        prevChar = char;
    }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];

        // Rule 4: {sj ʃj tj} → ʃ:
        if ((char === 's' && nextChar === 'j') || 
            (char === 'ʃ' && nextChar === 'j') || 
            (char === 't' && nextChar === 'j') ){
            replaceSubstring(i, 2, "ʃ:");
        }
            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];

        // Rule 5: ɸL → L:     taɸla
        if (L.includes(char) && prevChar === 'ɸ') {
           // replaceSubstring(i - 1, 1, ":");
            protoWord = protoWord.substring(0, i - 1) + protoWord.substring(i, i + 1) + ':' + protoWord.substring(i + 1);
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
    
        // Rule 6: Ø → e / #_r
        if ((char === 'r' && i === 0) ||
            (char === 'r' && (prevChar === "\n" || prevChar === " "))) {
            replaceSubstring(i, 0, "e");
        }
    
        prevChar = char; // Update prevChar for the next iteration
    }
        

    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 7: h → ʔ / V0_V0
        if ((char === 'h' && V.includes(prevChar) && prevChar === nextChar) ||
            (char === 'h' && V.includes(prevChar) && nextChar === "'" && prevChar === nextNextChar)) {
            replaceSubstring(i, 1, "ʔ");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules (Rule 8)
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 8: h → ʔ / a_i                       (soms)
        if ((char === 'h' && protoWord[i - 1] === 'a' && protoWord[i - 1] !== '\n' && nextChar === 'i') ||
            (char === 'h' && protoWord[i - 1] === 'a' && protoWord[i - 1] !== '\n'  && nextChar === "'" && nextNextChar === 'i')) {
            replaceSubstring(i, 1, "ʔ");
        }
    }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];

        // Rule 9: Vh → V: / _V ! _"V
        if (char === 'h' && V.includes(prevChar) && V.includes(nextChar)) {
           replaceSubstring(i, 1, ":");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 10: {.ai, .ei, ui, .au, .eu} → Dipthong / "_
        if ((char === 'a' && prevChar === "'" && nextChar === ':' && (nextNextChar === 'i' || nextNextChar === 'u' )) ||
            (char === 'e' && prevChar === "'" && nextChar === ':' && (nextNextChar === 'i' || nextNextChar === 'u' )) ||
            (char === 'u' && prevChar === "'" && nextChar === ':' && nextNextChar === 'i' )) {
           replaceSubstring(i, 0, ".");
           replaceSubstring(i + 2, 1, "");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 11: V1:V2:V1(:) → V1:V2:
        if (V.includes(char) && nextChar === ':' && V.includes(nextNextChar) && protoWord[i + 3] === ':' && V.includes(protoWord[i + 4])) {
           replaceSubstring(i + 4, 1, "");
        }
        if (char === ':' && nextChar === ':') {
        replaceSubstring(i, 1, "");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 12: iji → i:                     tij'ika
        if (char === "i" && nextChar === "j" && nextNextChar === "i") {
            replaceSubstring(i + 1, 2, ":");
        }
        if (char === "i" && nextChar === "j" && nextNextChar === "'" && protoWord[i + 3] === "i") {
            replaceSubstring(i, 4, "'i:");
            // replaceSubstring(i + 2, 0, ":");
        }

            prevChar = char;
        }



    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 13: {ai,au,ua} {ei,eu,ue} → a: e: ! "
        if (((char === "a" && (nextChar === "i" || nextChar === "u")) || (char === "u" && (nextChar === "a" || nextChar === "u"))) && prevChar !== "." && prevChar !== "'") {
            replaceSubstring(i, 2, "a:");
        }
        if (((char === "e" && (nextChar === "i" || nextChar === "u")) || (char === "u" && (nextChar === "e" || nextChar === "u"))) && prevChar !== "." && prevChar !== "'") {
            replaceSubstring(i, 2, "e:");
        }

            prevChar = char;
        }

    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];

        // Rule 14: O0VO0 → O0: !"
        if (O.includes(char) && V.includes(nextChar) && nextNextChar === char) {
            replaceSubstring(i + 1, 2, ":");
        }
        if (O.includes(char) && V.includes(nextChar) && nextNextChar === ':' && protoWord[i + 3] === char) {
            replaceSubstring(i + 1, 3, ":");
        }
        if (O.includes(char) && nextChar === ':' && V.includes(nextNextChar) && protoWord[i + 3] === char) {
            replaceSubstring(i + 1, 3, ":");
        }
        if (O.includes(char) && nextChar === ':' && V.includes(nextNextChar) && protoWord[i + 3] === ':' && protoWord[i + 4] === char) {
            replaceSubstring(i + 1, 4, ":");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];
        const lastChar = protoWord[i - 1];

        // Rule 15: k → c / V_{j,E}
        if ((char === 'k' && V.includes(lastChar) && (nextChar === 'j' || E.includes(nextChar))) ||
            (char === 'k' && V.includes(lastChar) && nextChar === "'" && E.includes(nextNextChar))) {
            replaceSubstring(i, 1, "c");
        }

            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];
        const lastChar = protoWord[i - 1];

        // Rule 16: p t k s ʃ ɸ → b d g z ʒ ß / V_V
        if (
            char === 'p' && (V.includes(lastChar) || (V.includes(protoWord[i - 2]) && lastChar === ":")) && ( (V.includes(nextChar) || (nextChar === "'" || nextChar === ".") && V.includes(nextNextChar)) || (nextChar === ":" && (V.includes(nextNextChar) || (nextNextChar === "'" || nextNextChar === ".") && V.includes(protoWord[i + 3]))) ) ){
            replaceSubstring(i, 1, "b");
        }
        if (
            char === 't' && (V.includes(lastChar) || (V.includes(protoWord[i - 2]) && lastChar === ":")) && ( (V.includes(nextChar) || (nextChar === "'" || nextChar === ".") && V.includes(nextNextChar)) || (nextChar === ":" && (V.includes(nextNextChar) || (nextNextChar === "'" || nextNextChar === ".") && V.includes(protoWord[i + 3]))) ) ){
            replaceSubstring(i, 1, "d");
        }
        if (
            char === 'k' && (V.includes(lastChar) || (V.includes(protoWord[i - 2]) && lastChar === ":")) && ( (V.includes(nextChar) || (nextChar === "'" || nextChar === ".") && V.includes(nextNextChar)) || (nextChar === ":" && (V.includes(nextNextChar) || (nextNextChar === "'" || nextNextChar === ".") && V.includes(protoWord[i + 3]))) ) ){
            replaceSubstring(i, 1, "g");
        }
        if (
            char === 's' && (V.includes(lastChar) || (V.includes(protoWord[i - 2]) && lastChar === ":")) && ( (V.includes(nextChar) || (nextChar === "'" || nextChar === ".") && V.includes(nextNextChar)) || (nextChar === ":" && (V.includes(nextNextChar) || (nextNextChar === "'" || nextNextChar === ".") && V.includes(protoWord[i + 3]))) ) ){
            replaceSubstring(i, 1, "z");
        }
        if (
            char === 'ʃ' && (V.includes(lastChar) || (V.includes(protoWord[i - 2]) && lastChar === ":")) && ( (V.includes(nextChar) || (nextChar === "'" || nextChar === ".") && V.includes(nextNextChar)) || (nextChar === ":" && (V.includes(nextNextChar) || (nextNextChar === "'" || nextNextChar === ".") && V.includes(protoWord[i + 3]))) ) ){
            replaceSubstring(i, 1, "ʒ");
        }
        if (
            char === 'ɸ' && (V.includes(lastChar) || (V.includes(protoWord[i - 2]) && lastChar === ":")) && ( (V.includes(nextChar) || (nextChar === "'" || nextChar === ".") && V.includes(nextNextChar)) || (nextChar === ":" && (V.includes(nextNextChar) || (nextNextChar === "'" || nextNextChar === ".") && V.includes(protoWord[i + 3]))) ) ){
            replaceSubstring(i, 1, "ß");
        }

        prevChar = char;
    }


    // Iterate through the protoWord again for additional rules
    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];

        // Rule 17: ß → ʋ
        if (char === 'ß' ) {
            replaceSubstring(i, 1, "ʋ");
        }
        
            prevChar = char;
        }


    // Iterate through the protoWord again for additional rules     


    for (let i = 0; i < protoWord.length; i++) {
        const char = protoWord[i];
        const nextChar = protoWord[i + 1];
        const nextNextChar = protoWord[i + 2];


        // Rule 18: ui {ua, ue} → i: u:


        


        
        if (char === 'u' && 
            (nextChar === 'i' || (X.includes(nextChar) && nextNextChar === 'i') || (X.includes(nextChar) && X.includes(nextNextChar) && protoWord[i + 3] === 'i') ) 
        ){

            replaceSubstring(i, 1, "");
            replaceSubstring(i + 1, 0, ":");
        }
        
            prevChar = char;
        }





    document.getElementById("myH1").textContent = `Your new word is:`;
    document.getElementById("myH2").textContent = `${protoWord}`;
}




//          18: ui {ua, ue} → i: u:
//          19: u: i: → o: e: / {#, C}_{C, #}
//          20: r → ɹ
//          21: ʔ → h
//          22: c → ç
//          23: {ia, ie, iu} ea ae → i: e: a:
//          24: V → Ø / {au, eu, ei, ui}_
//          25: V1V2V3 → V1:
//          26: {au, eu} {ei, ai} ui → o: e: u: (alleen diph)
//          27: e o {i,u} a → i u ɨ ə !"
//          28: ʋ → ɸ / _ə
//          29: V: C: → V C
//          30: ə → Ø / _#
//          31: V → ə /_# !"
//          32: ʋ → ɸ / _#
//          33: b d g → m n ŋ / _#
//          34: b d g → m n ŋ / _VN
//          35: D F[+voiced] → T F[-voiced]
//          36: p → ɸ / _Vh
//          37: V → Ø / N_{N,F[-voiced]}(VC)"V
//          38: {ç,h} → Ø / N_
//          39: m → Ø / _N
//          40: n → Ø / _{n,ŋ}
//          41: ŋ → Ø / _ŋ