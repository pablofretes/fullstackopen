import React from 'react';
import { CoursePart } from '../index';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Part = ({ part }: { part: CoursePart }) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <div>
                    <p><strong>{part.name}</strong> {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                </div>
            );
        case "Using props to pass data":
            return (
                <div>
                    <p><strong>{part.name}</strong> {part.exerciseCount}</p>
                    <p>Group Project Count {part.groupProjectCount}</p>
                </div>
            );
        case "Deeper type usage":
            return (
                <div>
                    <p><strong>{part.name}</strong> {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                    <p>Submit: {part.exerciseSubmissionLink}</p>
                </div>
            );
        case "React with Types":
            return (
                <div>
                    <p><strong>{part.name}</strong> {part.exerciseCount}</p>
                    <p>Description: {part.description}</p>
                </div>
            )
        default: 
            return assertNever(part);
    } 
}

export default Part;