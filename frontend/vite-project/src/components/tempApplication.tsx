<div key={index} className="mb-2 flex items-center gap-2">
            <select
              value={entry.role}
              onChange={(e) => {
                const newRoles = [...selectedRoles];
                newRoles[index].role = e.target.value;
                setSelectedRoles(newRoles);
              }}
            >
              {roles
                .filter((role) => role === entry.role || !selectedRoles.some((selected) => selected.role === role))
                .map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
            </select>

            <input
              type="number"
              step="0.1"
              value={entry.experience}
              min={0}
              onChange={(e) => {
                const newRoles = [...selectedRoles];
                newRoles[index].experience = parseFloat(e.target.value);
                setSelectedRoles(newRoles);
              }}
            />

            <button onClick={() => setSelectedRoles(selectedRoles.filter((_, i) => i !== index))}>
              <Trash size={16} />
            </button>
          </div>