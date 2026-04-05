import { Member } from "@/types/Member";
import { memberRepository } from "./memberRepository";

export class MemoryMemberRepository implements memberRepository {
    async save(member: Member): Promise<void> {
        MemoryMemberRepository.store.set(member.browserId, member);
    }
    async findByBrowserId(browserId: number): Promise<Member | null> {
        return MemoryMemberRepository.store.get(browserId) || null;
    }
    async findAll(): Promise<Member[] | null> {
        return Array.from(MemoryMemberRepository.store.values()) || null;
    }
    async deleteMember(browserId: number): Promise<void> {
        MemoryMemberRepository.store.delete(browserId);
    }
    clear(): void {
        MemoryMemberRepository.store.clear();
    }
    private static store = new Map<number, Member>();
    
}