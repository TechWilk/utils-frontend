import React, { FC, useCallback, useEffect, useReducer, useState } from 'react';
import debounce from 'lodash.debounce';
import Page from './Page';
import Button from '../patterns/Button';
import TextInput from '../patterns/TextInput';
import PhpProperty from './PhpProperty';

type ParsedProperty = {
    name: string,
    scope: string,
    type: string,
}

type StateProperty = {
    name: string
    type: string
}

type State = StateProperty[]

type Action = {
    type: 'update'
    name: string
    value: string
} | {
    type: 'addAndPurge'
    properties: ParsedProperty[]
}

function reducer(state: State, action: Action): State {
    console.log('state', state);
    console.log('action', action);
    switch (action.type) {
        case 'addAndPurge':
            const propertyNames = action.properties.map(p => p.name);
            const filteredState = state.filter(p => propertyNames.includes(p.name))

            return action.properties.map(item => {
                let index = filteredState.findIndex((p) => p.name === item.name);

                if (index !== -1 && filteredState[index].type !== '') {
                    return filteredState[index]
                }

                return item;
            });
        
        case 'update':
            let index = state.findIndex((obj: StateProperty) => obj.name === action.name);
            if (index === -1) {
                throw new Error('Doesn\'t exist');
            }

            return [
                ...state.slice(0, index),
                { name: action.name, type: action.value },
                ...state.slice(index + 1),
            ];
        default:
            throw new Error('Unknown reducer type');
    }
}

const PhpClassGenerator: FC = () => {
    const [textBlob, setTextBlob] = useState("");
    const [generatorVersion, setGeneratorVersion] = useState('8');
    const [generatedCode, setGeneratedCode] = useState('');

    const [state, dispatch] = useReducer(reducer, []);

    const parseTextBlob = useCallback(debounce((text: string) => {
        parse(text);
    }, 400), []);

    useEffect(() => {
        parseTextBlob(textBlob);
    
    }, [textBlob, parseTextBlob])

    const parse = (text: string) => {
        fetch(`${process.env.REACT_APP_API_URL}/php/parse`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "properties": text
            })
        }).then(response => response.json())
            .then(json => {
            const properties: ParsedProperty[] = json.properties;

            dispatch({
                type: "addAndPurge",
                properties: properties
            })
        })
    }

    const generateCode = () => {
        fetch(`${process.env.REACT_APP_API_URL}/php/build`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "version": generatorVersion,
                // "property": convertToLegacyApiFormat(state.properties),
                "properties": convertToApiFormat(state),
            })
        }).then(response => response.json())
        .then(json => {
            setGeneratedCode(json.code);
        })
    }

    // const convertToLegacyApiFormat = (properties: { name: string, type: string }[]) => {
    //     const formattedProperties: {[key: string]: string} = {};
    //     properties.forEach((property) => {
    //         formattedProperties[`${property.name}/scope`] = "private";
    //         formattedProperties[`${property.name}/property`] = property.name;
    //         formattedProperties[`${property.name}/type`] = property.type;
    //         formattedProperties[`${property.name}/enabled`] = "1";
    //     })

    //     return formattedProperties;
    // }

    const convertToApiFormat = (properties: { name: string, type: string }[]) => {
        const formattedProperties: {[key: string]: {
                scope: string
                property: string,
                type: string,
                enabled: string,
        }} = {};
        properties.forEach((property) => {
            formattedProperties[property.name] = {
                scope: "private",
                property: property.name,
                type: property.type,
                enabled: "1",
            }
        });

        return formattedProperties;
    }

    const handleFocus = (event: any) => event.target.select();
    const linesInString = (str: string) => ((str.match(/\n/g) || '').length + 1)

    return (
        <Page
            title="PHP Setter/Getter Generator"
            strapline={<>Codegen for <del>lazy</del> <em>efficient</em> developers.</>}
        >
            <label>
                <div>
                    Paste your class properties below. Whitespace, comments, property scope and default values will be stripped automatically.
                </div>
                <TextInput
                    type='textarea'
                    value={textBlob}
                    onChange={(text) => setTextBlob(text)}
                    placeholder={`private $name = ''; ... etc`}
                />
            </label>

            {state.length > 0 && (
                <>
                    <h2>{`Parsed into ${state.length} propert${state.length === 1 ? 'y' : 'ies'}:`}</h2>
                    <p>You may enter the variable's type in full, or use the following shorthand for common types:</p>
                    <p>i = int, s = string, b = boolean, f = float, a = array, c = callable, n = null, d = DateTimeImmutable</p>
                    <ul>
                        {state.map((item, key) => (
                            <li key={key}>
                                <PhpProperty
                                    name={item.name}
                                    type={item.type}
                                    onChange={(text) => dispatch({
                                        type: "update",
                                        name: item.name,
                                        value: text
                                    })}
                                />
                            </li>
                        ))}
                    </ul>
                </>
            )}
            <select
                value={generatorVersion}
                onChange={e => setGeneratorVersion(e.target.value)}
            >
                <option value="8">&gt;= PHP 7.0 (get + with) immutable code with types</option>
                <option value="7">&gt;= PHP 7.0 (get + set) code with types</option>
                <option value="5">&lt;= PHP 5.6 (get + set) code with manual types</option>
            </select>
            <Button onClick={generateCode}>Generate Code</Button>

            {generatedCode && (
                <>
                    <h2>{`Generated ${linesInString(generatedCode)} lines of code`}</h2>
                    <code style={{
                        border: '1px solid grey',
                        padding: '5px',
                        display: 'block',
                        width: '100%',
                        minHeight: '20vh',
                    }}
                        onFocus={handleFocus}
                    ><pre>{generatedCode}</pre></code>
                </>
            )}
        </Page>
    );
}

export default PhpClassGenerator;