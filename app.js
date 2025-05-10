function compile() {
    const html = document.getElementById("html");
    const css = document.getElementById("css");
    const js = document.getElementById("js");
    const code = document.getElementById("code").contentWindow.document;
    const runBtn = document.getElementById("run-btn");
    const clearBtn = document.getElementById("clear-btn");
    const togglePreviewBtn = document.getElementById("toggle-preview");
    const previewContainer = document.querySelector(".preview-container");
    
    // Run code function
    function runCode() {
        code.open();
        code.writeln(html.value + "<style>" + css.value + "</style>" + "<script>" + js.value + "</script>");
        code.close();
    }
    
    // Auto-run when typing (with slight delay)
    let timeout;
    function debounceCompile() {
        clearTimeout(timeout);
        timeout = setTimeout(runCode, 300);
    }
    
    // Event listeners
    html.addEventListener("input", debounceCompile);
    css.addEventListener("input", debounceCompile);
    js.addEventListener("input", debounceCompile);
    
    // Run button
    runBtn.addEventListener("click", function() {
        runCode();
        runBtn.classList.add("active");
        setTimeout(() => {
            runBtn.classList.remove("active");
        }, 300);
    });
    
    // Clear button
    clearBtn.addEventListener("click", function() {
        if(confirm("Are you sure you want to clear all code?")) {
            html.value = "";
            css.value = "";
            js.value = "";
            runCode();
        }
    });
    
    // Toggle preview
    togglePreviewBtn.addEventListener("click", function() {
        previewContainer.classList.toggle("hidden");
        if(previewContainer.classList.contains("hidden")) {
            togglePreviewBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Show Preview';
        } else {
            togglePreviewBtn.innerHTML = '<i class="fas fa-eye"></i> Hide Preview';
            runCode();
        }
    });
    
    // Initial run
    runCode();
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", compile);