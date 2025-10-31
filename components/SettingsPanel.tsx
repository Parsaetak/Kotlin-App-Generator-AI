import React from 'react';
import type { GenerationOptions, UploadedFile, ProjectType } from '../types';
import { ANDROID_API_LEVELS } from '../constants';

interface SettingsPanelProps {
  options: GenerationOptions;
  onOptionChange: (newOptions: GenerationOptions) => void;
  uploadedFiles: UploadedFile[];
}

const FileIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--glow-color-1)]"> <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path> <polyline points="14 2 14 8 20 8"></polyline> </svg> );

const OptionWrapper: React.FC<{label: string, children: React.ReactNode, tooltip: string}> = ({label, children, tooltip}) => (
    <div>
        <label className="block text-xs font-medium mb-1" style={{color: 'var(--text-secondary)'}} data-tooltip={tooltip}>
            {label}
        </label>
        {children}
    </div>
);

const StyledSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
    <select {...props} className="w-full rounded-md px-2 py-1 text-sm transition-all" style={{backgroundColor: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'var(--text-primary)'}} />
);

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ options, onOptionChange, uploadedFiles }) => {
    
  const handleOptionChange = <K extends keyof GenerationOptions>(key: K, value: GenerationOptions[K]) => {
    onOptionChange({ ...options, [key]: value });
  };
  
  const handleDependencyChange = (id: string) => {
      handleOptionChange('dependencies', options.dependencies.map(dep => 
        dep.id === id ? {...dep, checked: !dep.checked} : dep
      ));
  };

  const isAndroid = options.projectType === 'Android App';

  return (
    <aside className="w-full h-[85vh] flex-shrink-0 p-4 rounded-lg flex flex-col" style={{backgroundColor: 'var(--dark-ui)', border: '1px solid var(--border-color)'}}>
      <div className="pb-4 border-b" style={{borderColor: 'var(--border-color)'}}>
        <h2 className="text-lg font-bold">Project Settings</h2>
      </div>
      <div className="mt-4 space-y-4 flex-grow overflow-y-auto pr-1">
        <OptionWrapper 
            label="Project Type"
            tooltip="Select the type of Kotlin application you want to generate. This will tailor the file structure and boilerplate code."
        >
            <StyledSelect value={options.projectType} onChange={e => handleOptionChange('projectType', e.target.value as ProjectType)}>
                <option>Android App</option>
                <option>Ktor Server</option>
                <option>Compose for Desktop</option>
                <option>Kotlin Library</option>
            </StyledSelect>
        </OptionWrapper>

        {isAndroid && (
            <>
                <OptionWrapper 
                    label="Target API"
                    tooltip="Set the target Android API level. This determines the SDK version your app will be built against."
                >
                    <StyledSelect value={options.apiLevel} onChange={e => handleOptionChange('apiLevel', e.target.value)}>
                        {ANDROID_API_LEVELS.map(level => (
                            <option key={level.value} value={level.value}>{level.label}</option>
                        ))}
                    </StyledSelect>
                </OptionWrapper>
                 <OptionWrapper 
                    label="Architecture"
                    tooltip="Choose the architectural pattern for your Android app (e.g., MVVM, MVI). 'Standard' provides a basic structure."
                 >
                    <StyledSelect value={options.architecture} onChange={e => handleOptionChange('architecture', e.target.value as GenerationOptions['architecture'])}>
                        <option>MVVM</option>
                        <option>MVI</option>
                        <option>Standard</option>
                    </StyledSelect>
                </OptionWrapper>
                 <div data-tooltip="Select common libraries to include. The AI will add the necessary gradle dependencies.">
                    <label className="block text-xs font-medium mb-2 cursor-help" style={{color: 'var(--text-secondary)'}}>Common Dependencies</label>
                    <div className="grid grid-cols-1 gap-y-2">
                        {options.dependencies.map(dep => (
                            <label key={dep.id} className="flex items-center space-x-2 text-sm cursor-pointer">
                                <input type="checkbox" checked={dep.checked} onChange={() => handleDependencyChange(dep.id)} className="rounded" style={{backgroundColor: 'var(--dark-bg)', border: '1px solid var(--border-color)'}}/>
                                <span>{dep.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </>
        )}
        
        <div className="pt-4 border-t" style={{borderColor: 'var(--border-color)'}}>
          <h3 className="text-md font-bold mb-2">Project Files</h3>
          {uploadedFiles.length === 0 ? (
            <p className="text-sm" style={{color: 'var(--text-secondary)'}}>Upload files via the paperclip icon in the chat input to provide context.</p>
          ) : (
            <ul className="space-y-2">
              {uploadedFiles.map(file => (
                <li key={file.name} className="flex items-center gap-2 p-2 rounded" style={{backgroundColor: 'var(--dark-bg)'}}>
                  <FileIcon />
                  <span className="text-sm truncate" title={file.name}>{file.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <style>{`
        select:focus, input:focus {
            outline: none;
            border-color: var(--glow-color-2);
            box-shadow: 0 0 8px var(--glow-color-2);
        }
        input[type=checkbox]:checked {
            background-color: var(--glow-color-1);
            border-color: var(--glow-color-1);
            box-shadow: 0 0 6px var(--glow-color-1);
        }
    `}</style>
    </aside>
  );
};