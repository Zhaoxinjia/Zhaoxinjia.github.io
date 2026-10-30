---
title: "Research"
description: "PIToN-guided nanopore engineering, repeated single-molecule measurements, and two independent molecular-dynamics and finite-element modules."
draft: false
---

My research focuses on **nanopore single-molecule sensing devices and biomedical analytical methods**. The central goal is to develop actively controlled platforms that allow the **same molecule to be measured repeatedly**, while understanding how pore chemistry and molecular transport shape the ionic-current signal.

## Research Directions

<a id="nanopore-sensing"></a>

### 1. Nanopore molecular recognition {#molecular-recognition}

The **PIToN model** guides aerolysin pore engineering for **sub-dalton single-molecule discrimination of protein citrullination** (accepted, *Nature Communications*). We also develop assays for neutral glycans, sialic-acid linkage isomers, and cisplatin–DNA adducts, supporting protein-modification analysis, glycan structure determination, and drug–nucleic acid studies.

{{< research-figure "recognition" >}}

### 2. Single-molecule manipulation {#single-molecule-manipulation}

We develop core solid-state nanopore detection modules, low-current ionic-recording systems, and **molecular ping-pong control with FPGA-driven instrumentation**. Repeated capture enables multiple measurements of the same molecule, reducing the random variation of single translocation events and improving the consistency of molecular characterization.

{{< research-figure "manipulation" >}}

### 3. Mechanism and theory {#mechanistic-studies}

Two independent modules constrain the same measurement. **Molecular dynamics** resolves the local chemistry of the pore—confinement, electrostatics, hydrogen bonding, van der Waals and hydrophobic contacts. **Finite-element (Poisson–Nernst–Planck) simulation** resolves transport and the electric field in the channel. Neither is a preprocessing step for the other; both are compared against measured ΔI and Δt, and both feed back into pore design.

{{< research-figure "mechanism" >}}
