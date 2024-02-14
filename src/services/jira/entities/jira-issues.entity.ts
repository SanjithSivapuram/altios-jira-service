export class JiraIssues {
    startAt: number;
    maxResults: number;
    total: number;
    issueTypes: IssueMetaData[];
}

export class IssueMetaData {
    self: string;
    id: string;
    description: string;
    iconUrl: string;
    name: string;
    untranslatedName: string;
    subtask: boolean;
}

export class IssueDetails {
    startAt: number;
    maxResults: number;
    total: number;
    fields: IssueField[];
}

class IssueField {
    required: boolean;
    schema: {
        type: string;
        items?: string;
        system: string
    };
    name: string;
    key: string;
    autoCompleteUrl?: string;
    hasDefaultValue: boolean;
    operations: string[];
    allowedValues?: IssueAllowedValues[];
    fieldId: string;
}

class IssueAllowedValues {
    self: string;
    id: string;
    name: string;
    description: string;
}