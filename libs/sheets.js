import { google } from 'googleapis';
import _ from 'lodash';

export async function getData(args=false, env) {
  const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
  const jwt = new google.auth.JWT(
    env.GOOGLE_SHEETS_CLIENT_EMAIL,
    null,
    (env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    target
  );

  const sheets = google.sheets({ version: 'v4', auth: jwt });
      
   

  //console.log(sheets)
  //console.log("env2", env)
  let response
  if(args){
    response = await sheets.spreadsheets.values.get(args);
  }else{
    response = await sheets.spreadsheets.values.get({
      spreadsheetId: env.SPREADSHEET_ID,
      range: 'fasty', // sheet name
    });
  } 
 
  console.log("response", response.data.values) 
  return  response.data.values 
}

/*
export async function getSheet() {
 try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );
    
    const sheets = google.sheets({ version: 'v4', auth: jwt });
    return sheets   
  } catch (err) {
    console.log(err);
  }
  return [];
}

export async function getEmojiList() {
  //console.log("process.env", process.env)
  //console.log(google)
 try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
      null,
      (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );
    
    const sheets = google.sheets({ version: 'v4', auth: jwt });
    return sheets
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      //range: 'A1:A2', // sheet name
      range: 'fasty', // sheet name
    });
    console.log("Data", response.data.values)
    const rows = response.data.values;

    let filtered_array = _.filter(
        rows, function(row) {
          return row[0]==3;
        }
    );
      

    console.log("Labels", rows[0])
    console.log("filtered", filtered_array)

    
    if (rows.length) {
      return rows.map((row) => ({
        title: row[2],
        subtitle: row[3],
        code: row[4],
        browser: row[5],
        short_name: row[17],
        emojipedia_slug: row[18],
        descriptions: row[19],
      }));
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}*/