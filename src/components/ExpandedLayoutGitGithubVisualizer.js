import React, { useState, useEffect, useRef } from 'react';
import { GitBranch, Github, ArrowRight, RefreshCw, ChevronRight, ChevronLeft } from 'lucide-react';

const ExpandedLayoutGitGithubVisualizer = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const descriptionRefs = useRef([]);

  const steps = [
    { title: "ローカルリポジトリ", icon: GitBranch, color: "from-purple-400 to-purple-600" },
    { title: "コミット", icon: RefreshCw, color: "from-green-400 to-green-600" },
    { title: "プッシュ", icon: ArrowRight, color: "from-blue-400 to-blue-600" },
    { title: "GitHub", icon: Github, color: "from-orange-400 to-orange-600" },
  ];

  const descriptions = [
    "ローカルリポジトリは、あなたのコンピュータ上にあるプロジェクトのバージョン管理システムです。ここでコードの変更を追跡し、管理します。ファイルの追加、修正、削除などの変更履歴を保存し、必要に応じて以前のバージョンに戻ることができます。",
    "コミットは、プロジェクトの特定時点のスナップショットを作成します。各コミットには変更内容と説明が含まれます。これにより、プロジェクトの進行状況を追跡し、チーム内で変更の意図を共有することができます。コミットは、変更を段階的に記録する重要な手段です。",
    "プッシュは、ローカルで行った変更をリモートリポジトリ（GitHub）にアップロードする操作です。これにより、チームメンバーと変更を共有できます。プッシュすることで、ローカルでの作業をチーム全体で利用可能にし、コラボレーションを促進します。",
    "GitHubは、Gitリポジトリのホスティングサービスです。コードの共有、コラボレーション、バージョン管理を容易にします。プルリクエストやイシューなどの機能を通じて、効率的なチーム開発をサポートします。また、オープンソースプロジェクトの公開や、他の開発者との協力も可能にします。"
  ];

  useEffect(() => {
    // 最大の高さを計算
    const maxDescriptionHeight = Math.max(...descriptionRefs.current.map(ref => ref.offsetHeight));
    setMaxHeight(maxDescriptionHeight + 300); // 300pxは他の要素のための余裕
  }, []);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveStep(activeStep + 1);
        setIsAnimating(false);
      }, 500);
    }
  };

  const handlePrev = () => {
    if (activeStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveStep(activeStep - 1);
        setIsAnimating(false);
      }, 500);
    }
  };

  return (
    <div className="w-[700px] bg-gray-900 text-white rounded-xl shadow-2xl relative p-8 flex flex-col" style={{ minHeight: `${maxHeight}px` }}>
      <h2 className="text-3xl font-bold mb-8 text-center">GitとGitHubの仕組み</h2>
      <div className="flex justify-between items-center mb-10 relative">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center z-10">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 bg-gradient-to-br ${
                index === activeStep ? step.color : 'from-gray-600 to-gray-800'
              }`}
            >
              <step.icon size={40} className={index === activeStep ? 'animate-pulse' : ''} />
            </div>
            <p className="mt-3 font-semibold text-center w-24">{step.title}</p>
          </div>
        ))}
        <div className="absolute top-10 left-0 w-full h-1 bg-gray-700">
          <div
            className={`h-full bg-gradient-to-r ${steps[activeStep].color} transition-all duration-500 ${
              isAnimating ? 'animate-pulse' : ''
            }`}
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-gray-800 p-8 rounded-lg flex-grow mb-8">
        <h3 className="text-2xl font-semibold mb-4">{steps[activeStep].title}</h3>
        {descriptions.map((description, index) => (
          <p
            key={index}
            ref={el => descriptionRefs.current[index] = el}
            className={`leading-relaxed text-lg ${index === activeStep ? '' : 'hidden'}`}
          >
            {description}
          </p>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={activeStep === 0}
          className={`flex items-center px-6 py-3 rounded-lg text-lg ${
            activeStep === 0 ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          <ChevronLeft size={24} className="mr-2" />
          前へ
        </button>
        <button
          onClick={handleNext}
          disabled={activeStep === steps.length - 1}
          className={`flex items-center px-6 py-3 rounded-lg text-lg ${
            activeStep === steps.length - 1 ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          次へ
          <ChevronRight size={24} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ExpandedLayoutGitGithubVisualizer;