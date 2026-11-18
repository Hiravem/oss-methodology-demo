/**
 * Open Source Development Methodology Simulator & Interactive Guide
 * Author: Antigravity OSS Education Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initLifecycleSimulator();
  initGitGraph();
  initPrReviewSimulator();
  initLicenseDecision();
  initSemverCalculator();
});

/* ==========================================================================
   1. TAB SWITCHING SYSTEM
   ========================================================================== */
function initTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  const panes = document.querySelectorAll('.tab-pane');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.target;
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   2. CONTRIBUTION LIFECYCLE 7-STEP SIMULATOR
   ========================================================================== */
const lifecycleStages = [
  {
    step: 1,
    title: "1. Khám phá Issue & Chuẩn bị (Discovery & Issue Triage)",
    subtitle: "Xác định vấn đề, đọc tài liệu đóng góp, kiểm tra quy tắc ứng xử",
    guidelines: `
      <ul>
        <li><strong>CONTRIBUTING.md</strong>: Hướng dẫn tiêu chuẩn code, setup môi trường và workflow của dự án.</li>
        <li><strong>CODE_OF_CONDUCT.md</strong>: Quy tắc ứng xử trong cộng đồng (thường dùng Contributor Covenant).</li>
        <li><strong>Good First Issue</strong>: Nhãn (label) dành cho người mới bắt đầu để làm quen kiến trúc.</li>
        <li><strong>Bình luận xin nhận Issue</strong>: Giúp tránh việc nhiều người cùng làm trùng lặp một việc.</li>
      </ul>
    `,
    suggestedCmd: `gh issue view 42 --web\n# Hoặc đọc tài liệu đóng góp:\ncat CONTRIBUTING.md`,
    autoLogs: [
      "[INFO] Đọc file CONTRIBUTING.md...",
      "[INFO] Kiểm tra Code of Conduct (Contributor Covenant 2.1)...",
      "[SUCCESS] Tìm thấy Issue #42 [good-first-issue]: 'Add JWT token expiration verification'.",
      "[INFO] Bình luận: 'Xin chào maintainer, tôi muốn nhận xử lý issue này!'"
    ]
  },
  {
    step: 2,
    title: "2. Fork & Cấu hình Remote (Forking Workflow)",
    subtitle: "Tạo bản sao repository về tài khoản cá nhân và cấu hình upstream",
    guidelines: `
      <ul>
        <li><strong>Fork</strong>: Tạo bản sao độc lập của upstream repo về tài khoản cá nhân trên GitHub/GitLab.</li>
        <li><strong>Clone</strong>: Tải mã nguồn từ fork cá nhân (origin) về máy cục bộ (local).</li>
        <li><strong>Upstream remote</strong>: Đặt liên kết tới repo gốc để đồng bộ mã mới nhất khi cần (sync upstream).</li>
      </ul>
    `,
    suggestedCmd: `gh repo fork upstream-org/open-core --clone\ncd open-core\ngit remote add upstream https://github.com/upstream-org/open-core.git\ngit remote -v`,
    autoLogs: [
      "[GIT] Tạo Fork: https://github.com/your-username/open-core",
      "[GIT] Cloning into 'open-core'...",
      "[GIT] Remote 'origin' -> https://github.com/your-username/open-core.git",
      "[GIT] Remote 'upstream' -> https://github.com/upstream-org/open-core.git",
      "[SUCCESS] Môi trường cục bộ đã sẵn sàng với mô hình 2 remotes (origin & upstream)!"
    ]
  },
  {
    step: 3,
    title: "3. Nhánh tính năng & Tiêu chuẩn Code (Branching & Standards)",
    subtitle: "Tạo nhánh tách biệt từ upstream/main và tuân thủ Conventional Commits",
    guidelines: `
      <ul>
        <li><strong>Tuyệt đối không commit trực tiếp vào main</strong>: Luôn tạo feature branch từ bản cập nhật mới nhất.</li>
        <li><strong>Quy ước đặt tên nhánh</strong>: <code>feat/issue-42-jwt-expiry</code> hoặc <code>fix/login-bug</code>.</li>
        <li><strong>Conventional Commits</strong>: Cú pháp <code>type(scope): description</code> giúp tạo changelog tự động.</li>
        <li><strong>Developer Certificate of Origin (DCO)</strong>: Ký cam kết bản quyền mã nguồn bằng <code>git commit -s</code>.</li>
      </ul>
    `,
    suggestedCmd: `git fetch upstream\ngit checkout -b feat/jwt-expiry upstream/main\n# Viết code xử lý token...\ngit commit -s -m "feat(auth): verify JWT expiration timestamp"`,
    autoLogs: [
      "[GIT] Đồng bộ upstream/main...",
      "[GIT] Switched to a new branch 'feat/jwt-expiry'",
      "[HOOK] Chạy pre-commit linter: ESLint passed (0 errors, 0 warnings).",
      "[HOOK] Kiểm tra quy tắc commit message: Conventional Commit validated.",
      "[GIT] [feat/jwt-expiry 8a1f4b2] feat(auth): verify JWT expiration timestamp (Signed-off-by: You)"
    ]
  },
  {
    step: 4,
    title: "4. Kiểm thử & Cổng chất lượng CI (Quality Gates & Local CI)",
    subtitle: "Chạy unit test, kiểm tra độ phủ mã (code coverage) trước khi đẩy lên remote",
    guidelines: `
      <ul>
        <li><strong>Chạy toàn bộ test suite cục bộ</strong>: Đảm bảo không làm hỏng tính năng hiện hữu (Regression).</li>
        <li><strong>Viết thêm Unit Test mới</strong>: Code đóng góp cho OSS bắt buộc phải có test đi kèm tương ứng.</li>
        <li><strong>Kiểm tra format & static analysis</strong>: Chạy prettier, sonarqube scan hoặc security audit.</li>
      </ul>
    `,
    suggestedCmd: `npm run lint\nnpm test -- --coverage\ngit push -u origin feat/jwt-expiry`,
    autoLogs: [
      "[TEST] Running Jest Unit Test Suite...",
      "[TEST] PASS tests/auth.test.ts (14 tests passed, 0 failed)",
      "[TEST] Code Coverage: Statements 94.2%, Branches 91.8%, Functions 96.0%",
      "[GIT] Pushing to https://github.com/your-username/open-core.git",
      "[GIT] Branch 'feat/jwt-expiry' set up to track remote branch 'feat/jwt-expiry' from 'origin'."
    ]
  },
  {
    step: 5,
    title: "5. Mở Pull Request & Tự động hóa CI (Pull Request & GitHub Actions)",
    subtitle: "Mở PR với mô tả chi tiết, liên kết Issue và kích hoạt pipeline CI",
    guidelines: `
      <ul>
        <li><strong>PR Template</strong>: Điền đầy đủ mục: Mô tả thay đổi, Động lực, Cách kiểm thử, Checklist.</li>
        <li><strong>Magic Keywords</strong>: Dùng <code>Closes #42</code> hoặc <code>Fixes #42</code> để tự động đóng Issue khi PR được merge.</li>
        <li><strong>CI Automated Checks</strong>: Hệ thống CI (GitHub Actions) tự động chạy Matrix Test trên các OS & phiên bản runtime.</li>
      </ul>
    `,
    suggestedCmd: `gh pr create --title "feat(auth): verify JWT expiration timestamp" \\\n  --body "Closes #42. Added exp claim validation with clock skew tolerance."`,
    autoLogs: [
      "[PR] Creating Pull Request from your-username:feat/jwt-expiry into upstream-org:main...",
      "[PR] Pull Request #108 opened: https://github.com/upstream-org/open-core/pull/108",
      "[CI] GitHub Actions triggered on pr #108...",
      "[CI] Matrix: Node.js 18, 20, 22 on Ubuntu/macOS/Windows - ALL PASSED (3m 12s)",
      "[CI] CLA Assistant: Contributor License Agreement signed!"
    ]
  },
  {
    step: 6,
    title: "6. Đánh giá mã nguồn cộng đồng (Peer Code Review & Iteration)",
    subtitle: "Maintainers và cộng đồng đóng góp ý kiến, phản hồi tích cực và cập nhật PR",
    guidelines: `
      <ul>
        <li><strong>Văn hóa giao tiếp xây dựng (Constructive Feedback)</strong>: Tôn trọng công sức của nhau, giải thích lý do thay vì chỉ trích.</li>
        <li><strong>Yêu cầu thay đổi (Changes Requested)</strong>: Nếu phát hiện thiếu sót (vd: thiếu test case biên), maintainer sẽ yêu cầu bổ sung.</li>
        <li><strong>Cập nhật PR</strong>: Chỉ cần commit thêm và push vào cùng nhánh trên origin, PR sẽ tự cập nhật.</li>
      </ul>
    `,
    suggestedCmd: `# Maintainer nhận xét: Thêm clock skew tolerance 10 giây\n# Bạn sửa code và push thêm commit:\ngit commit -s -m "fix(auth): add 10s clock skew tolerance"\ngit push origin feat/jwt-expiry`,
    autoLogs: [
      "[REVIEW] Maintainer @alex_maintainer commented: 'Great PR! Please add 10s clock skew handling for edge clock drift.'",
      "[DEV] Contributor commit thêm: 'fix(auth): add 10s clock skew tolerance'",
      "[CI] CI re-run: 16 tests passed. All checks green.",
      "[REVIEW] @alex_maintainer approved these changes: 'LGTM! (Looks Good To Me)'"
    ]
  },
  {
    step: 7,
    title: "7. Hợp nhất, Phát hành & Tôn vinh (Merge, Release & SemVer)",
    subtitle: "Maintainer thực hiện Merge (Squash/Rebase), tag bản phát hành và ghi nhận đóng góp",
    guidelines: `
      <ul>
        <li><strong>Chiến lược Merge</strong>: Thường dùng <strong>Squash and Merge</strong> để lịch sử git trên main gọn gàng, 1 commit sạch cho 1 tính năng.</li>
        <li><strong>Semantic Versioning (SemVer)</strong>: Dựa vào commit <code>feat(...)</code>, phiên bản tự động nhảy từ <code>v1.2.0</code> lên <code>v1.3.0</code>.</li>
        <li><strong>All Contributors</strong>: Tên của bạn được ghi nhận vào danh sách CONTRIBUTORS.md và ghi chú phát hành (Release Notes).</li>
      </ul>
    `,
    suggestedCmd: `# Maintainer merge PR:\ngh pr merge 108 --squash --delete-branch\n# Tự động hóa Semantic Release tạo bản v1.3.0`,
    autoLogs: [
      "[MERGE] PR #108 merged into upstream:main via Squash and Merge!",
      "[CLEANUP] Deleted remote branch your-username:feat/jwt-expiry",
      "[RELEASE] Semantic Release triggered: feat commit detected -> Bumping MINOR version (v1.2.0 -> v1.3.0)",
      "[RELEASE] Auto-generated CHANGELOG.md with entry: 'feat(auth): verify JWT expiration timestamp (#108)'",
      "[HONOR] Bạn đã chính thức trở thành Open Source Contributor của dự án! Chúc mừng!"
    ]
  }
];

let currentStageIndex = 0;

function initLifecycleSimulator() {
  renderStepProgress();
  loadStage(0);

  const prevBtn = document.getElementById('btn-prev-stage');
  const nextBtn = document.getElementById('btn-next-stage');
  const runCmdBtn = document.getElementById('btn-run-cmd');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStageIndex > 0) {
        loadStage(currentStageIndex - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStageIndex < lifecycleStages.length - 1) {
        loadStage(currentStageIndex + 1);
      }
    });
  }

  if (runCmdBtn) {
    runCmdBtn.addEventListener('click', () => {
      simulateCommandExecution();
    });
  }
}

function renderStepProgress() {
  const container = document.getElementById('lifecycle-stepper');
  if (!container) return;

  container.innerHTML = '';
  lifecycleStages.forEach((stage, idx) => {
    const node = document.createElement('div');
    node.className = `step-node ${idx === 0 ? 'active' : ''}`;
    node.id = `step-node-${idx}`;
    node.innerHTML = `
      <div class="step-circle">${stage.step}</div>
      <div class="step-label">${stage.title.split('.')[1].split('(')[0].trim()}</div>
    `;
    node.addEventListener('click', () => loadStage(idx));
    container.appendChild(node);
  });
}

function loadStage(index) {
  currentStageIndex = index;
  const stage = lifecycleStages[index];

  // Update stepper UI
  lifecycleStages.forEach((_, idx) => {
    const node = document.getElementById(`step-node-${idx}`);
    if (!node) return;
    node.classList.remove('active', 'completed');
    if (idx < index) node.classList.add('completed');
    if (idx === index) node.classList.add('active');
  });

  // Update content
  document.getElementById('sim-stage-title').innerText = stage.title;
  document.getElementById('sim-stage-subtitle').innerText = stage.subtitle;
  document.getElementById('sim-stage-guidelines').innerHTML = stage.guidelines;
  document.getElementById('sim-suggested-cmd').innerText = stage.suggestedCmd;

  // Clear or reset terminal
  const term = document.getElementById('terminal-content');
  term.innerHTML = `<div class="term-line term-dim"># Sẵn sàng mô phỏng Bước ${stage.step}. Nhấn "Thực thi lệnh mô phỏng" bên dưới.</div>`;

  // Update nav buttons
  const prevBtn = document.getElementById('btn-prev-stage');
  const nextBtn = document.getElementById('btn-next-stage');
  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) {
    nextBtn.innerText = index === lifecycleStages.length - 1 ? 'Hoàn thành chu trình 🚀' : 'Bước tiếp theo ➡️';
  }
}

function simulateCommandExecution() {
  const stage = lifecycleStages[currentStageIndex];
  const term = document.getElementById('terminal-content');
  term.innerHTML = `<div class="term-line term-cmd">$ ${stage.suggestedCmd.split('\n')[0]}</div>`;

  let delay = 350;
  stage.autoLogs.forEach((log) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = 'term-line ' + (log.includes('[SUCCESS]') || log.includes('[HONOR]') ? 'term-success' : log.includes('[GIT]') || log.includes('[CI]') ? 'term-output' : 'term-dim');
      line.innerText = log;
      term.appendChild(line);
      term.scrollTop = term.scrollHeight;
    }, delay);
    delay += 400;
  });

  showToast(`Đã mô phỏng xong Bước ${stage.step}: ${stage.title.split('(')[0]}`);
}

/* ==========================================================================
   3. GIT GRAPH TOPOLOGY VISUALIZER (SVG Canvas)
   ========================================================================== */
let gitState = {
  upstreamCommits: ['c1', 'c2'],
  localMainCommits: ['c1', 'c2'],
  featureCommits: [],
  isForked: false,
  isBranchCreated: false,
  isPrOpen: false,
  isPrMerged: false
};

function initGitGraph() {
  renderGitSvg();

  document.getElementById('git-action-fork')?.addEventListener('click', () => {
    gitState.isForked = true;
    showToast("Đã Fork upstream repository thành công!");
    renderGitSvg();
  });

  document.getElementById('git-action-branch')?.addEventListener('click', () => {
    if (!gitState.isForked) {
      showToast("Vui lòng Fork repository trước!");
      return;
    }
    gitState.isBranchCreated = true;
    showToast("Đã tạo nhánh 'feat/my-patch' từ local main!");
    renderGitSvg();
  });

  document.getElementById('git-action-commit')?.addEventListener('click', () => {
    if (!gitState.isBranchCreated) {
      showToast("Hãy tạo nhánh feat/my-patch trước khi commit!");
      return;
    }
    const newCommitId = 'c' + (gitState.upstreamCommits.length + gitState.featureCommits.length + 1);
    gitState.featureCommits.push(newCommitId);
    showToast(`Đã commit ${newCommitId} vào feat/my-patch!`);
    renderGitSvg();
  });

  document.getElementById('git-action-pr')?.addEventListener('click', () => {
    if (gitState.featureCommits.length === 0) {
      showToast("Cần có ít nhất 1 commit trên nhánh feature để mở PR!");
      return;
    }
    gitState.isPrOpen = true;
    showToast("Pull Request đã được mở vào upstream:main!");
    renderGitSvg();
  });

  document.getElementById('git-action-merge')?.addEventListener('click', () => {
    if (!gitState.isPrOpen) {
      showToast("Cần mở PR trước khi Maintainer có thể Merge!");
      return;
    }
    gitState.isPrMerged = true;
    gitState.upstreamCommits.push('merge-pr');
    showToast("Maintainer đã Squash and Merge PR vào upstream:main!");
    renderGitSvg();
  });

  document.getElementById('git-action-reset')?.addEventListener('click', () => {
    gitState = {
      upstreamCommits: ['c1', 'c2'],
      localMainCommits: ['c1', 'c2'],
      featureCommits: [],
      isForked: false,
      isBranchCreated: false,
      isPrOpen: false,
      isPrMerged: false
    };
    showToast("Đã reset trạng thái Git graph.");
    renderGitSvg();
  });
}

function renderGitSvg() {
  const svg = document.getElementById('git-svg');
  if (!svg) return;

  svg.innerHTML = '';
  const width = svg.clientWidth || 800;
  
  // Y Coordinates for lanes
  const yUpstream = 60;
  const yOriginMain = 150;
  const yFeatureBranch = 240;

  // Labels
  svg.innerHTML += `
    <text x="20" y="${yUpstream - 15}" fill="#58a6ff" font-size="12" font-weight="bold">UPSTREAM (main)</text>
    <text x="20" y="${yOriginMain - 15}" fill="#8b949e" font-size="12" font-weight="bold">ORIGIN / FORK (main)</text>
    <text x="20" y="${yFeatureBranch - 15}" fill="#a371f7" font-size="12" font-weight="bold">LOCAL / FORK (feat/my-patch)</text>
    
    <!-- Base Lane Guidelines -->
    <line x1="180" y1="${yUpstream}" x2="750" y2="${yUpstream}" stroke="#21262d" stroke-width="2" stroke-dasharray="4"/>
    <line x1="180" y1="${yOriginMain}" x2="750" y2="${yOriginMain}" stroke="#21262d" stroke-width="2" stroke-dasharray="4"/>
    <line x1="180" y1="${yFeatureBranch}" x2="750" y2="${yFeatureBranch}" stroke="#21262d" stroke-width="2" stroke-dasharray="4"/>
  `;

  // Draw Initial Commits c1, c2
  drawCommit(svg, 200, yUpstream, 'C1 (init)', '#58a6ff');
  drawCommit(svg, 280, yUpstream, 'C2', '#58a6ff');
  drawLink(svg, 200, yUpstream, 280, yUpstream, '#58a6ff');

  if (gitState.isForked) {
    drawCommit(svg, 200, yOriginMain, 'C1', '#8b949e');
    drawCommit(svg, 280, yOriginMain, 'C2', '#8b949e');
    drawLink(svg, 200, yOriginMain, 280, yOriginMain, '#8b949e');
    // Fork connection line
    drawDashedCurve(svg, 280, yUpstream, 280, yOriginMain, '#8b949e', 'fork');
  }

  if (gitState.isBranchCreated) {
    drawDashedCurve(svg, 280, yOriginMain, 340, yFeatureBranch, '#a371f7', 'branch');
  }

  // Draw feature commits
  let lastX = 340;
  gitState.featureCommits.forEach((c, idx) => {
    const x = 360 + (idx * 80);
    drawCommit(svg, x, yFeatureBranch, c, '#a371f7');
    if (idx === 0) {
      drawLink(svg, 280, yOriginMain, x, yFeatureBranch, '#a371f7');
    } else {
      drawLink(svg, lastX, yFeatureBranch, x, yFeatureBranch, '#a371f7');
    }
    lastX = x;
  });

  if (gitState.isPrOpen && !gitState.isPrMerged) {
    // Arrow pointing from last feature commit towards upstream
    drawDashedCurve(svg, lastX, yFeatureBranch, 620, yUpstream, '#d29922', 'PR #108 (Open)');
  }

  if (gitState.isPrMerged) {
    // Merge commit on Upstream
    drawCommit(svg, 680, yUpstream, 'C_Merge (#108)', '#2ea043');
    drawLink(svg, 280, yUpstream, 680, yUpstream, '#58a6ff');
    drawCurve(svg, lastX, yFeatureBranch, 680, yUpstream, '#2ea043');
    // Success badge
    svg.innerHTML += `
      <rect x="580" y="${yUpstream - 45}" width="160" height="24" rx="12" fill="#238636" />
      <text x="660" y="${yUpstream - 29}" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">MERGED & RELEASED</text>
    `;
  }
}

function drawCommit(svg, x, y, label, color) {
  svg.innerHTML += `
    <g>
      <circle cx="${x}" cy="${y}" r="14" fill="${color}" stroke="#0d1117" stroke-width="3" style="filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5));" />
      <text x="${x}" y="${y + 28}" fill="#c9d1d9" font-size="11" font-family="monospace" text-anchor="middle">${label}</text>
    </g>
  `;
}

function drawLink(svg, x1, y1, x2, y2, color) {
  svg.innerHTML += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3" />`;
}

function drawDashedCurve(svg, x1, y1, x2, y2, color, labelText) {
  const midX = (x1 + x2) / 2;
  const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
  svg.innerHTML += `
    <path d="${path}" stroke="${color}" stroke-width="2" stroke-dasharray="5,5" fill="none" />
    <text x="${midX}" y="${(y1 + y2)/2 - 5}" fill="${color}" font-size="11" text-anchor="middle" font-weight="600">${labelText}</text>
  `;
}

function drawCurve(svg, x1, y1, x2, y2, color) {
  const midX = (x1 + x2) / 2;
  const path = `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
  svg.innerHTML += `<path d="${path}" stroke="${color}" stroke-width="3" fill="none" />`;
}

/* ==========================================================================
   4. PULL REQUEST CODE REVIEW SIMULATOR (Mini-Game)
   ========================================================================== */
function initPrReviewSimulator() {
  const commentButtons = document.querySelectorAll('.review-add-comment');
  const actionApprove = document.getElementById('pr-btn-approve');
  const actionRequestChanges = document.getElementById('pr-btn-request-changes');
  const prFeedbackBox = document.getElementById('pr-feedback-log');

  let identifiedVulnerability = false;

  commentButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lineNum = btn.dataset.line;
      if (lineNum === '12') {
        identifiedVulnerability = true;
        btn.innerHTML = '✅ Đã nhận diện lỗ hổng';
        btn.classList.add('btn-primary');
        logFeedback("🚨 Chính xác! Dòng 12 ghép trực tiếp chuỗi vào câu truy vấn SQL mà không dùng tham số (SQL Injection vulnerability).", "warning");
      } else {
        logFeedback(`ℹ️ Bạn vừa để lại ghi chú tại dòng ${lineNum}. Dòng này tuân thủ tốt conventions.`, "info");
      }
    });
  });

  if (actionRequestChanges) {
    actionRequestChanges.addEventListener('click', () => {
      if (identifiedVulnerability) {
        logFeedback("🏆 XUẤT SẮC! Với vai trò Maintainer, bạn đã phát hiện lỗi SQL Injection và yêu cầu Contributor đổi sang dùng Prepared Statements (Parameterized Queries). PR đã được chặn đúng lúc!", "success");
        document.getElementById('pr-status-pill').className = "status-pill status-closed";
        document.getElementById('pr-status-pill').innerText = "Changes Requested ⚠️";
      } else {
        logFeedback("⚠️ Bạn đã yêu cầu thay đổi nhưng chưa chỉ ra lỗ hổng bảo mật nghiêm trọng ở dòng 12. Hãy click 'Bình luận' tại dòng 12 trước!", "warning");
      }
    });
  }

  if (actionApprove) {
    actionApprove.addEventListener('click', () => {
      if (identifiedVulnerability) {
        logFeedback("❌ CẢNH BÁO: Bạn đã phát hiện lỗ hổng SQL Injection nhưng lại bấm 'Approve & Merge'! Trong phương pháp mã nguồn mở, việc merge code dính bảo mật sẽ gây rủi ro cho hàng triệu người dùng downstream.", "danger");
      } else {
        logFeedback("❌ NGUY HIỂM: Bạn vừa Approve một PR có lỗ hổng SQL Injection ở dòng 12! Hãy đọc kỹ code diff trước khi duyệt.", "danger");
      }
    });
  }

  function logFeedback(msg, type) {
    if (!prFeedbackBox) return;
    const item = document.createElement('div');
    item.className = `term-line ${type === 'success' ? 'term-success' : type === 'warning' ? 'term-warning' : type === 'danger' ? 'text-red' : 'term-output'}`;
    item.style.padding = "6px 0";
    item.innerHTML = msg;
    prFeedbackBox.appendChild(item);
    prFeedbackBox.scrollTop = prFeedbackBox.scrollHeight;
  }
}

/* ==========================================================================
   5. OPEN SOURCE LICENSE DECISION MATRIX
   ========================================================================== */
const licenseData = {
  mit: {
    name: "MIT License",
    badge: "Permissive (Dễ dãi nhất)",
    summary: "Rất ngắn gọn, cho phép mọi người làm bất cứ điều gì với mã nguồn của bạn (kể cả đóng gói bán thương mại mã đóng), chỉ cần giữ lại thông báo bản quyền và miễn trừ trách nhiệm.",
    permissions: ["Thương mại hóa", "Sửa đổi", "Phân phối", "Dùng cho mã đóng"],
    conditions: ["Giữ nguyên License & Bản quyền"],
    limitations: ["Không bảo hành trách nhiệm"],
    recommendFor: "Thích hợp cho các thư viện tiện ích, framework muốn thu hút cộng đồng đông đảo nhất (vd: React, Vue, Express, Node.js)."
  },
  apache2: {
    name: "Apache License 2.0",
    badge: "Permissive + Patent Grant",
    summary: "Tương tự MIT nhưng bổ sung điều khoản cấp phép bằng sáng chế rõ ràng (Patent Rights) và bảo vệ nhãn hiệu thương mại (Trademarks).",
    permissions: ["Thương mại hóa", "Sửa đổi", "Phân phối", "Cấp quyền sáng chế"],
    conditions: ["Giữ thông báo bản quyền", "Nêu rõ các thay đổi trong file"],
    limitations: ["Không được dùng nhãn hiệu thương mại", "Không bảo hành trách nhiệm"],
    recommendFor: "Lựa chọn tiêu chuẩn của các tổ chức doanh nghiệp lớn (vd: Kubernetes, TensorFlow, Apache Spark, Rust)."
  },
  gpl3: {
    name: "GNU General Public License v3.0 (GPLv3)",
    badge: "Strong Copyleft (Bảo vệ tự do)",
    summary: "Mọi phần mềm phái sinh (derivative works) hoặc kết hợp cùng mã nguồn này bắt buộc phải mở mã nguồn dưới cùng giấy phép GPLv3. Ngăn chặn việc 'đóng mã' của các tập đoàn.",
    permissions: ["Thương mại hóa", "Sửa đổi", "Phân phối"],
    conditions: ["Bắt buộc công khai toàn bộ mã nguồn phái sinh", "Giữ nguyên giấy phép GPLv3"],
    limitations: ["Không cấp quyền dùng trong phần mềm độc quyền mã đóng"],
    recommendFor: "Phù hợp cho các ứng dụng hoàn chỉnh muốn đảm bảo phần mềm luôn mãi mãi miễn phí & mở (vd: Linux Kernel - GPLv2, Git, Blender, GIMP)."
  },
  agpl3: {
    name: "GNU Affero GPL v3.0 (AGPLv3)",
    badge: "Network Copyleft (Bảo vệ Cloud/SaaS)",
    summary: "Phiên bản nâng cấp của GPLv3, bịt lỗ hổng 'SaaS Loophole'. Nếu ai đó chạy dịch vụ qua mạng (Cloud / Web API) bằng mã của bạn, họ vẫn buộc phải cung cấp mã nguồn cho người dùng.",
    permissions: ["Thương mại hóa dịch vụ", "Sửa đổi", "Phân phối"],
    conditions: ["Phải mở mã nguồn kể cả khi chỉ chạy trên server đám mây"],
    limitations: ["Không cho phép dùng trong dịch vụ SaaS mã đóng"],
    recommendFor: "Dành cho các hệ thống database, nền tảng backend muốn ngăn chặn các nhà cung cấp đám mây lớn (như AWS) lấy về kinh doanh dịch vụ mà không đóng góp lại (vd: Grafana, Mastodon)."
  }
};

function initLicenseDecision() {
  const buttons = document.querySelectorAll('.license-quiz-btn');
  const resultCard = document.getElementById('license-result-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const key = btn.dataset.license;
      const data = licenseData[key];
      if (!data || !resultCard) return;

      resultCard.style.display = 'block';
      resultCard.innerHTML = `
        <div class="card-header">
          <div>
            <h3 style="color: var(--accent-blue); font-size: 1.3rem;">${data.name}</h3>
            <span class="badge badge-oss" style="margin-top: 6px;">${data.badge}</span>
          </div>
        </div>
        <p style="margin-bottom: 1rem; color: var(--text-primary);">${data.summary}</p>
        
        <div class="license-tags">
          ${data.permissions.map(p => `<span class="license-tag tag-perm">✔ ${p}</span>`).join('')}
          ${data.conditions.map(c => `<span class="license-tag tag-cond">⚠️ ${c}</span>`).join('')}
          ${data.limitations.map(l => `<span class="license-tag tag-lim">✖ ${l}</span>`).join('')}
        </div>

        <div style="background: rgba(88, 166, 255, 0.08); border-left: 3px solid var(--accent-blue); padding: 10px 14px; border-radius: 4px; font-size: 0.88rem; margin-top: 1rem;">
          <strong>Khuyên dùng khi:</strong> ${data.recommendFor}
        </div>
      `;
    });
  });
}

/* ==========================================================================
   6. CONVENTIONAL COMMITS & SEMVER CALCULATOR
   ========================================================================== */
function initSemverCalculator() {
  const typeSelect = document.getElementById('commit-type');
  const scopeInput = document.getElementById('commit-scope');
  const descInput = document.getElementById('commit-desc');
  const breakingCheckbox = document.getElementById('commit-breaking');
  
  const currentVersionEl = document.getElementById('current-version');
  const nextVersionEl = document.getElementById('next-version');
  const previewCommitEl = document.getElementById('preview-commit-msg');
  const bumpReasonEl = document.getElementById('bump-reason');

  let currentVer = { major: 1, minor: 2, patch: 4 };

  function update() {
    const type = typeSelect ? typeSelect.value : 'feat';
    const scope = scopeInput ? scopeInput.value.trim() : '';
    const desc = descInput ? descInput.value.trim() || 'add new feature' : '';
    const isBreaking = breakingCheckbox ? breakingCheckbox.checked : false;

    // Conventional Commit string
    const scopePart = scope ? `(${scope})` : '';
    const breakingMark = isBreaking ? '!' : '';
    const commitMsg = `${type}${scopePart}${breakingMark}: ${desc}`;
    if (previewCommitEl) previewCommitEl.innerText = commitMsg;

    // SemVer calculation
    let next = { ...currentVer };
    let reason = "";

    if (isBreaking) {
      next.major += 1;
      next.minor = 0;
      next.patch = 0;
      reason = "🚨 BREAKING CHANGE phát hiện -> Tăng MAJOR version (+1.0.0). Các API cũ có thể không còn tương thích!";
    } else if (type === 'feat') {
      next.minor += 1;
      next.patch = 0;
      reason = "✨ Commit loại 'feat' -> Tăng MINOR version (+0.1.0). Thêm tính năng mới có tính tương thích ngược.";
    } else if (type === 'fix' || type === 'perf' || type === 'refactor') {
      next.patch += 1;
      reason = `🐛 Commit loại '${type}' -> Tăng PATCH version (+0.0.1). Sửa lỗi hoặc cải thiện hiệu năng tương thích ngược.`;
    } else {
      reason = `ℹ️ Commit loại '${type}' (docs/chore/style) -> Thường không kích hoạt phát hành bản mới hoặc chỉ bump PATCH.`;
    }

    if (currentVersionEl) currentVersionEl.innerText = `v${currentVer.major}.${currentVer.minor}.${currentVer.patch}`;
    if (nextVersionEl) nextVersionEl.innerText = `v${next.major}.${next.minor}.${next.patch}`;
    if (bumpReasonEl) bumpReasonEl.innerHTML = reason;
  }

  [typeSelect, scopeInput, descInput, breakingCheckbox].forEach(el => {
    if (el) {
      el.addEventListener('input', update);
      el.addEventListener('change', update);
    }
  });

  document.getElementById('btn-apply-bump')?.addEventListener('click', () => {
    const nextText = nextVersionEl?.innerText?.replace('v', '');
    if (nextText) {
      const parts = nextText.split('.').map(Number);
      currentVer = { major: parts[0], minor: parts[1], patch: parts[2] };
      update();
      showToast(`Đã xuất bản phiên bản mới: v${currentVer.major}.${currentVer.minor}.${currentVer.patch}!`);
    }
  });

  update();
}

/* ==========================================================================
   HELPER UTILITY: Toast Notification
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}
