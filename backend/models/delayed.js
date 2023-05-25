// <REQUEST>
//           <LOGIN authenticationkey="openapiconsolekey" />
//           <QUERY objecttype="TrainAnnouncement" orderby='AdvertisedTimeAtLocation' schemaversion="1.8">
//                 <FILTER>
//                 <AND>
//                     <EQ name="ActivityType" value="Avgang" />
//                     <GT name="EstimatedTimeAtLocation" value="$now" />
//                     <AND>
//                         <GT name='AdvertisedTimeAtLocation' value='$dateadd(-00:15:00)' />
//                         <LT name='AdvertisedTimeAtLocation'                   value='$dateadd(02:00:00)' />
//                     </AND>
//                 </AND>
//                 </FILTER>
//                 <INCLUDE>ActivityId</INCLUDE>
//                 <INCLUDE>ActivityType</INCLUDE>
//                 <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
//                 <INCLUDE>EstimatedTimeAtLocation</INCLUDE>
//                 <INCLUDE>AdvertisedTrainIdent</INCLUDE>
//                 <INCLUDE>OperationalTrainNumber</INCLUDE>
//                 <INCLUDE>Canceled</INCLUDE>
//                 <INCLUDE>FromLocation</INCLUDE>
//                 <INCLUDE>ToLocation</INCLUDE>
//                 <INCLUDE>LocationSignature</INCLUDE>
//                 <INCLUDE>TimeAtLocation</INCLUDE>
//                 <INCLUDE>TrainOwner</INCLUDE>
//           </QUERY>
//     </REQUEST>
