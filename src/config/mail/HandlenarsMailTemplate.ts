import Handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariables {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariables;
}

export default class HandlebarsMailTemplate {
    public async parse({
        file,
        variables
    }: IParseMailTemplate): Promise<string> {
        const templateContent = await fs.promises.readFile(file, 'utf-8');
        const parseTemplate = Handlebars.compile(templateContent);
        return parseTemplate(variables);
    }
}
