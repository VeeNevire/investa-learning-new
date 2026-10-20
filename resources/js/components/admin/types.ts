// Shapes shared by admin pages and the Laravel controllers that feed them
// (see app/Support/AdminTable.php).

export type Option = { value: string; label: string };

export type TableMeta = {
    page: number;
    lastPage: number;
    total: number;
    perPage: number;
    // Position of the first row on this page, counting from 1 (0 if empty).
    from: number;
};

export type ServerTable<T> = {
    rows: T[];
    meta: TableMeta;
    // Current search (`q`), filters and other query values to keep.
    query: Record<string, string>;
};

// One exam result (see HasilController::result): 1 point per correct answer.
export type ExamResult = {
    number: string;
    examName: string;
    exam: string;
    class: string;
    uid: string;
    name: string;
    score: number;
    passing: number;
    passed: boolean;
};
