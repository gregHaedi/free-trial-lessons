### free-trial-lessons

The idea of registering for a trial lesson (on the legacy site) probably came up in 2016 and made it possible for the individual LCs to set dates for it. LCs that wanted to give these trial lessons sent us an excel sheet which, in addition to the date, also included the language for the lesson and the start time.Unfortunately the date and time format as well as the ISO language code had to be corrected in some cases and finally everything had to be imported into a MySQL table.Finally, the registration form included a dropdown with the participating LCs and the respective dates.

**1st**
- consuming the Google spradsheed
- adding a "formatedDate" column to the event list and preserve the leading zero to the "lcid"
- rendering the whole list

**2nd**
- only use the data from the sheet whose start date is greater than the current date
- adding a language map, e.g. 'en' => 'English' for the event list
- adding the LC dropdown and consolidate the values (lcid) and options (lc-name) befor; no functionality yet
- display of the current option values ​​next to the dropdown 