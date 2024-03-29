# NZS3910-Webversion
This tool is meant to be used by NZ civil engineers when responding to contractor payment claims - in accordance with the 'New Zealand Standard 3910:2013'. 

## Functionality
This tool fetches from an open API a list of public holidays.
It ignores weekends, public holidays and the Christmas period (24th Dec - 5th Jan) as specified by the NZS3910:2013 standard. 

## Important Info
To the specification of NZS3910:2013
Please note this tool uses important specifications from the NZS 3910:2013 - _References where applicable included_ 
### Important Terms
- **Date claim received:** It is the date on which the payment claim was 'served' on the Engineer and counts as Working day 0 (1.5, G12.2.4). 
- **Working Day:** A day other than Saturday, Sunday, public holidays, or during 24th Dec-5th Jan (both inclusive) (1.2)  
- **Region:** The region associated with the offical headquaters the document has been served to as per [NZ ISO 3166](https://en.wikipedia.org/wiki/ISO_3166-2:NZ)  
- **Key Dates:** A day an action must be completed by (e.g. A must be completed within B working days)
    - Note: All key dates where taken from 12.2, which outlines the important deadlines.  

### Choosing Start Date 
  - It is the date on which the payment claim was 'served' on the Engineer (1.5, G12.2.4).  
  - It is counted as day 0 - Day 1 is the Working Day AFTER you receive/are served it  
  - **IMPORTANT:** If you received the claim after 5PM or on a non-Working Day, you must select the NEXT Working Day (15.1.8).  

### Choosing a Region
  Select your region associated with the offical headquaters the document has been served to as per [NZ ISO 3166](https://en.wikipedia.org/wiki/ISO_3166-2:NZ) 
  e.g If you are a remote worker for the Hamilton headquarters, then you would choose Waikato.
  
## How to use
This uses statically hosted files - i.e. everything runs in your browser
Just download the react build ('gh-pages' branch) and open the index.html in your browser! - Make sure you have an internet connection for the Public Holiday API
OR  
you can [Visit the github Pages](https://nzs3910.skwangles.com) version. 

READ the important info @ the top of the page, and enter a start date accordingly, then click 'calculate' - then you can note down the relevant dates. :)
Your region will be automatically set to "Waikato"

## Local Development
Install the libraries:  
`npm install`

Create a viewable version:  
`npm run build` and open the `index.html`  
OR  
`npm run dev`  

## If you like what I do, consider buying me a coffee
https://www.buymeacoffee.com/skwangles
