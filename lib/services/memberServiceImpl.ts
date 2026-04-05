import { Member } from "@/types/Member";
import { memberService } from "./memberService";
import { memberRepository } from "../repositories/memberRepository";

export class memberServiceImpl implements memberService {
    constructor(private readonly repository : memberRepository) {
    }

    async join(member: Member): Promise<Member> {
    const newMember: Member = {
            browserId: member.browserId,
            name: member.name
        };
    await this.repository.save(newMember);
    return newMember;
    }
    async findOne(browserId: number): Promise<Member > {
        const member = await this.repository.findByBrowserId(browserId);
        if (member != null) {
            return member;
        } else {
            throw new Error("unknown member")
        }
    }

}