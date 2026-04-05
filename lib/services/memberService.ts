import { Member } from "@/types/Member";

export interface memberService {
    join(member : Member): Promise<Member>;
    findOne(browserId: number): Promise<Member>;
}