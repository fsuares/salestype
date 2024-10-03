import Customer from '@customers/infra/typeorm/entities/Customer';

export interface IPaginatedCustomer {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number;
    next_page: number | null;
    last_page: number | null;
    data: Customer[];
}
