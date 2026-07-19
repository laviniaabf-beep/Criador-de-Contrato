import { useState } from 'react';

export default function Dashboard({ projects, onSelectProject, onNewContract, onDeleteProject, onDeleteAll }) {
  const [deleting, setDeleting] = useState(null);
  const [deletingAll, setDeletingAll] = useState(false);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (deleting === id) {
      onDeleteProject(id);
      setDeleting(null);
    } else {
      setDeleting(id);
    }
  };

  const handleDeleteAll = () => {
    if (deletingAll) {
      onDeleteAll();
      setDeletingAll(false);
    } else {
      setDeletingAll(true);
    }
  };

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Meus Contratos</h2>
          <p className="dashboard-sub">
            {projects.length === 0
              ? 'Nenhum contrato salvo ainda.'
              : `${projects.length} contrato${projects.length !== 1 ? 's' : ''} salvo${projects.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <div className="dashboard-header-actions">
          {projects.length > 0 && (
            <button
              className={`btn-delete-all ${deletingAll ? 'btn-delete-all-confirm' : ''}`}
              onClick={handleDeleteAll}
              onBlur={() => setDeletingAll(false)}
            >
              {deletingAll ? 'Confirmar exclusão' : 'Excluir Todos'}
            </button>
          )}
          <button className="btn-primary" onClick={onNewContract}>+ Novo Contrato</button>
        </div>
      </div>

      {projects.length > 0 && (
        <div className="dashboard-grid">
          {[...projects].reverse().map((proj) => (
            <div
              key={proj.id}
              className="dashboard-card"
              onClick={() => onSelectProject(proj)}
            >
              <div className="dashboard-card-header">
                <h3>{proj.tema}</h3>
                <span className="dashboard-card-date">
                  {new Date(proj.updatedAt || proj.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <p className="dashboard-card-preview">
                {proj.formData.objeto
                  ? proj.formData.objeto.substring(0, 120)
                  : proj.formData.parte1
                  ? `${proj.formData.parte1} ${proj.formData.parte2 ? `× ${proj.formData.parte2}` : ''}`
                  : 'Sem detalhes'}
                {(proj.formData.objeto?.length > 120) && '…'}
              </p>
              <div className="dashboard-card-actions">
                <button
                  className={`btn-delete ${deleting === proj.id ? 'btn-delete-confirm' : ''}`}
                  onClick={(e) => handleDelete(e, proj.id)}
                >
                  {deleting === proj.id ? 'Confirmar exclusão' : 'Excluir'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
