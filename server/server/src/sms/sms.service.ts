import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class SmsService {
   
async sending(number:string,message:string){

    try{
        const resp = await axios.post(
            'https://www.fast2sms.com/dev/bulkV2',{

                route:'q',
                message,
                language:'english',
                numbers:number
            },
            {
                headers:{
                    authorization:process.env.FAST2SMS_API_KEY
                }
            }
        )
        return resp.data
    } catch(err){
        console.error("something went wrong, err"
        );
        throw err
    }
}

}
