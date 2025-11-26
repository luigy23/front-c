import React from 'react';
import { Key, Link, Type, Hash, AlignLeft, CheckCircle, XCircle } from 'lucide-react';
import './ClassDetails.css';

const ClassDetails = ({ data }) => {
    if (!data) return null;

    return (
        <div className="class-details">
            <header className="details-header">
                <h2 className="class-title">{data.class}</h2>
                <p className="class-description">{data.description}</p>
            </header>

            <section className="section">
                <h3 className="section-title">Attributes</h3>
                <div className="table-container">
                    <table className="attributes-table">
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }}></th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Length</th>
                                <th>Description</th>
                                <th>Auto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.attributes.map((attr) => (
                                <tr key={attr.name}>
                                    <td className="icon-cell">
                                        {attr.primary_key === "True" && <Key size={14} className="pk-icon" title="Primary Key" />}
                                        {attr.foreign_key === "True" && <Link size={14} className="fk-icon" title="Foreign Key" />}
                                    </td>
                                    <td className="name-cell">{attr.name}</td>
                                    <td className="type-cell">
                                        <span className={`type-badge ${attr.data_type}`}>
                                            {attr.data_type}
                                        </span>
                                    </td>
                                    <td className="length-cell">{attr.length > 0 ? attr.length : '-'}</td>
                                    <td className="desc-cell">{attr.description}</td>
                                    <td className="bool-cell">
                                        {attr.autoincrement === "True" ?
                                            <CheckCircle size={14} className="true-icon" /> :
                                            <span className="dash">-</span>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {data.references && data.references.length > 0 && (
                <section className="section">
                    <h3 className="section-title">Relationships</h3>
                    <div className="references-grid">
                        {data.references.map((ref, idx) => (
                            <div key={idx} className="reference-card">
                                <div className="ref-header">
                                    <span className="ref-source">{ref.campo_origen}</span>
                                    <Link size={16} className="ref-arrow" />
                                    <span className="ref-target">{ref.tabla_destino}.{ref.campo_destino}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassDetails;
