import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Links } from './schemas/Links.schema';
import { createDto } from './dto/Create.dto';

@Injectable()
export class ShortenerService {
    constructor(@InjectModel(Links.name) private linkModel: Model<Links>){}
    
    async create(createDto:createDto){
        const num = await this.findNum();
        createDto['num'] = num;
        const newUser = new this.linkModel(createDto);

        newUser.save();

        return `Your shortened link is: http://localhost:3000/shortener/num:${num}`
           
    }

    async getByNum(num:number) {
        try {
            const user = await this.linkModel.findOne({ num: num });
            return user;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error; 
        }
    }

    async findNum(){
        for(let i = 0;true; i++){
            const currentDoc = await this.getByNum(i);
            if(!currentDoc){
                return i;
            }
                      
    }
}

    async findLink(num:number){
        const document = await this.linkModel.findOne({ num: num });
        const link = document.Original;
        return link;
    }



}
