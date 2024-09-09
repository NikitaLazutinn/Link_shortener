import {Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER,Cache} from '@nestjs/cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Links } from './schemas/Links.schema';
import { createDto } from './dto/Create.dto';

@Injectable()
export class ShortenerService {
    constructor(@InjectModel(Links.name) private linkModel: Model<Links>,
    @Inject(CACHE_MANAGER) private readonly redis: Cache){}
    
    async create(createDto:createDto){
        const reply = "Your shortened link is: http://localhost:3000/shortener/";
        const exist = await this.linkModel.findOne({ Original: createDto.Original });

        if(exist){
            const link = await this.redis.get(exist.num.toString());
            if(!link){
                await this.redis.set(exist.num.toString(), createDto.Original, 60000);
            }

            return `${reply}${exist.num}`;

        }else{
            const num = await this.findNum();
            await this.redis.set(num.toString(), createDto.Original, 60000);
            createDto['num'] = num;
            createDto['usageTimes'] = 0;
            const newUser = new this.linkModel(createDto);
    
            newUser.save();
    
            return `${reply}${num}`;
        }
         
    }

    async findLinkByNum(num:number) {
        try {
            const user = await this.linkModel.findOne({ num: num });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findNum(){
        for(let i = 0;true; i++){
            const currentDoc = await this.findLinkByNum(i);
            if(!currentDoc){
                return i;
            }
                      
    }
}

    async GetLink(num:number){      
        const link = await this.redis.get(num.toString());

        if(link){
        return link;
        
        }else{
            try{
            const document = await this.linkModel.findOne({ num: num });
            const link = document.Original;
            await this.linkModel.findOneAndUpdate(
                { num: num },
                { $inc: { usageTimes: 1} }, 
                { new: true } 
              );
            return link;
            }catch{
                throw new NotFoundException('Link not found');
            }
        }
         
    }

    async getStatistic(num:number){
        try{
            const document = await this.linkModel.findOne({ num: num });
            const usageTimes = document.usageTimes;

            return `this link was used ${usageTimes} times`;
            }catch{
                throw new NotFoundException('Link not found');
            }
    }



}
