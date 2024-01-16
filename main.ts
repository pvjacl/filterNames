const dataFile = './names.csv';


// Sort first by last name - Group Families together
const sortByLast = (rgNameA:string[], rgNameB:string[]) => {
  if (rgNameA[0] < rgNameB[0]) {
    return -1;
  } else if (rgNameA[0] > rgNameB[0]) {
    return 1;
  } else {
    if (rgNameA[2] < rgNameB[2]) {
      return -1;
    } else if (rgNameA[2] > rgNameB[2]) {
      return 1;
    } 
    return 0;
  }
}

// open the names file and start analyzing the data
Deno.readTextFile(dataFile).then((text: string) => {
  const lines = text.split(/\r\n/);
  const colTitles:string[] = [];
  const names: string[][] = [];

  lines.forEach((line, row) => {
    const tokens = line.split(',');
    if (row === 0) {
      tokens.forEach(token => {
        colTitles.push(token.toLowerCase().replace(' ', '_').replace('#', 'id'));
      });
    } else {
      const row:string[] = [];
      tokens.forEach(token => {
        row.push(token);
      })
      names.push(row);
    }
  });

  names.sort(sortByLast);
  const filteredNames = filterDuplicates(names);

  const struct = filteredNames.map(name => {
    return (nameJson(colTitles, name));
  })

  Deno.writeTextFile('output/names.json', JSON.stringify(struct, null, 2));
  writeCsv(struct)

});


type NameStruct = {
  last_name: string;
  first_name:string;
  family_id: string;
  mixed_case_last_name: string;
  mixed_case_first_name:string;
  family_digits:string;
}
const writeCsv = async (nameStructs: NameStruct[]) => {
  const lines:string[] = [];
  lines.push('Last Name, First Name, Family #, Last Name (mixed case), First Name (mixed case)');
  nameStructs.forEach(name => {
    lines.push(`${name.last_name},${name.first_name},${name.family_id},${name.mixed_case_last_name},${name.mixed_case_first_name}`);
  })
  Deno.writeTextFileSync('output/filteredNames.csv', lines.join('\n'));
}

const nameJson = (keys: string[], rowData: string[]):NameStruct => {
  return {
    last_name: rowData[0],
    first_name: rowData[1],
    family_id: rowData[2],
    mixed_case_last_name: keyMixer(rowData[0]),
    mixed_case_first_name: keyMixer(rowData[1]),
    family_digits: rowData[2].replace(/[A-Za-z]/, '')
  };
}

const keyMixer = (name: string) : string => {
  //handle multiple names
  const tokens = name.split(' ');
  const mixedNames = tokens.map(name => {
    return `${name.charAt(0)}${name.slice(1).toLowerCase()}`;
  })
  return mixedNames.join(' ');
}

// assumes that names are sorted
const filterDuplicates = (names: string[][]):string[][] => {
  const filteredNames: string[][] = [];
  names.forEach((name: string[], row:number) => {
    if (row === 0) {
      filteredNames.push(name);
      return;
    }
    const prevName = names[row-1];
    if (name[0] !== prevName[0] || name[1] !== prevName[1] || name[2] !== prevName[2]) {
      filteredNames.push(name);
    }
  });
  return filteredNames;
}