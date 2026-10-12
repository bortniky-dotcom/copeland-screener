(function () {
  var S = [
    ["I", "I. INATTENTION / DISTRACTIBILITY", ["A short attention span, especially for lo-interest activities.","Difficulty competing tasks.","Daydreaming.","Easily distracted.","Nicknames such as: \"spacey\" or \"dreamer\".","Engages in much activity but accomplishes little.","Enthusiastic beginnings but poor endings."]],
    ["II", "II. IMPULSIVITY", ["Excitability.","Low frustration tolerance.","Acts before thinking.","Disorganization.","Poor planning ability.","Excessively shifts from one activity to another.","Difficulty in group situations which require patience and taking turns.","Interrupts frequently."]],
    ["IIIA", "III. ACTIVITY LEVEL PROBLEMS: A. Overactivity / hyperactivity", ["Restlessness - either fidgeting or being constantly on the go.","Diminished need for sleep.","Excessive talking.","Difficulty listening.","Restlessness during sleep. Kicks covers off - moves constantly.","Dislike of situations which require attention and being still."]],
    ["IIIB", "III. ACTIVITY LEVEL PROBLEMS: B. Underactivity", ["Lethargic","Daydreaming, spiciness.","Failure to complete tasks.","Inattention.","Lacking in leadership.","Difficulty in getting things done."]],
    ["IV", "IV. NONCOMPLIANCE", ["Does not cooperate. Determined to do things own way.","Argumentative.","Disregards socially-accepted behavioral expectations.","\"Forgets\" unintentionally.","\"Forgets\" as an excuse (intentionally)."]],
    ["V", "V. UNDERACHIEVEMENT / DISORGANIZATION / LEARNING PROBLEMS", ["Underachievement in relation to ability.","Frequent job changes.","Loses things - keys, wallet, lists, belongings, etc.","Auditory memory and auditory processing problems.","Learning disabilities or learning problems.","Poor handwriting.","\"Messy\" or \"sloppy\" work.","Work assignments are often not completed satisfactorily.","Rushes through work.","Works too slowly","Procrastinates. Bills, taxes, etc., put off until the last minute."]],
    ["VI", "VI. EMOTIONAL DIFFICULTIES", ["Frequent and unpredictable mood swings.","Irritability.","Underreactive to pain / insensitive to danger.","Easily overstimulated. Hard to stop once \"revved\" up.","Low frustration tolerance. Excessive emotional reaction.","Angry outbursts.","Moodiness / lack of energy.","Low self-esteem","Immaturity."]],
    ["VII", "VII. POOR PEER RELATIONS", ["Difficulty following the rules of social interactions.","Rejected or avoided by peers.","Avoids group activity. A loner.","\"Bosses\" other people. Wants to be a leader.","Critical of others."]],
    ["VIII", "VIII. IMPAIRED FAMILY RELATIONS", ["Easily frustrated with spouse or children. Overreacts. May punish children too severely.","Sees things from own point of view. Does not negotiate differences well.","Underdeveloped sense of responsibility.","Poor manager of money.","Unreasonable; demanding.","Spends excessive amount of time at work because of inefficiency, leaving little time for family."]]
  ];
  var O = ["Not at all","Just a little","Pretty much","Very much"].map(function (l, i) { return { v: i, l: l }; });
  var CATS = [["I", "I. Inattention / Distractibility", ["I"]], ["II", "II. Impulsivity", ["II"]], ["III", "III. Activity Level Problems", ["IIIA", "IIIB"]], ["IV", "IV. Noncompliance", ["IV"]], ["V", "V. Underachievement / Disorganization / Learning Problems", ["V"]], ["VI", "VI. Emotional Difficulties", ["VI"]], ["VII", "VII. Poor Peer Relations", ["VII"]], ["VIII", "VIII. Impaired Family Relations", ["VIII"]]];
  function ids(code) { var s = S.filter(function (x) { return x[0] === code; })[0]; return s[2].map(function (_, i) { return code + "_" + (i + 1); }); }
  function band(p) { if (p >= 70) return "major interference (above 70%)"; if (p >= 50) return "moderate to severe difficulties (50-69%)"; if (p >= 35) return "mild to moderate difficulties (35-49%)"; return "below 35% (no band in source)"; }
  window.CFG = {
    slug: "copeland", short: "Copeland", sub: "Copeland Symptom List, Adult Attention Deficit Disorder",
    fields: [{ id: "completed_by", label: "Completed by", type: "text" }],
    intro: "This checklist was developed from the experience of many specialists in the field of Attention Disorders and Hyperactivity. It is designed to help determine whether you, or someone you are rating, has ADHD or ADD and in which area(s) difficulties are experienced. Please mark all statements. Thank you for your assistance in completing this information.<br><br>Please check every item below, indicating the degree to which the behavior is characteristic of yourself or the adult you are rating.",
    sections: S.map(function (s) { return { id: s[0], title: s[1], items: s[2].map(function (t, i) { return { id: s[0] + "_" + (i + 1), num: (s[0] === "IIIA" ? "A" : s[0] === "IIIB" ? "B" : "") + (i + 1) + ".", text: t, opts: O }; }) }; }),
    scoringHint: '<p class="hint">Scores: Not at all = 0, Just a little = 1, Pretty much = 2, Very much = 3. Each check receives a score from 0-3. Add the checks in each category. That score is placed over the total possible. Compute the percentages for each category: Scores between 35-49% suggest mild to moderate difficulties. Scores between 50-69% suggest moderate to severe difficulties. Scores above 70% suggest major interference.</p>',
    footer: "Copeland Symptom List · Adult ADD · screening only",
    score: function (A, H) {
      var rows = [], inc = false;
      CATS.forEach(function (c) {
        var ii = []; c[2].forEach(function (k) { ii = ii.concat(ids(k)); });
        var t = H.sum(A, ii), max = ii.length * 3;
        if (t === null) { inc = true; rows.push([c[1], "Incomplete, not scored (" + H.missing(A, ii).length + " blank) /" + max]); }
        else { var p = Math.round(100 * t / max); rows.push([c[1], t + "/" + max + " = " + p + "%, " + band(p)]); }
      });
      return { incomplete: inc, rows: rows };
    }
  };
})();
