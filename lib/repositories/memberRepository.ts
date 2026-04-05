import { Member } from "@/types/Member";

export interface memberRepository {
    save(member: Member): Promise<void>;
    findByBrowserId(browserId: number): Promise<Member | null>;
    findAll(): Promise<Member[] | null>;
    deleteMember(browserId: number): void;
}