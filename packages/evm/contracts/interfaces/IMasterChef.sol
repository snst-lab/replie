//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.19;

/// @notice The MasterChef contract gives out ARSW tokens for yield farming.
/// The amount of ARSW token reward decreases per month (215000 blocks).
/// For the detail, see the token economics documents: https://docs.arthswap.org/arsw-token
interface IMasterChef {
  /// @notice Info of each MasterChef user.
  /// `amount` LP token amount the user has provided.

  /// @notice Returns the number of MasterChef pools.
  function poolLength() external view returns (uint256 pools);

  /// @notice View function to see pending ARSW on frontend.
  /// @param pid The index of the pool. See `poolInfo`.
  /// @param user Address of user.
  /// @return pending ARSW reward for a given user.
  function pendingARSW(uint256 pid, address user) external view returns (uint256 pending);

  /// @notice get period of the given blockNumber.
  /// @param blockNumber block number
  /// @return period period of the blockNumber
  function getPeriod(uint256 blockNumber) external view returns (uint256 period);

  /// @notice get max block number in the given period.
  /// @param period period
  /// @return periodMaxBlock max block number in the period
  function periodMax(uint256 period) external view returns (uint256 periodMaxBlock);

  /// @notice Calculates and returns the `amount` of ARSW per block.
  function ARSWPerBlock(uint256 period) external view returns (uint256 amount);

  /// @notice Deposit LP tokens to MasterChef for ARSW allocation.
  /// @param pid The index of the pool. See `poolInfo`.
  /// @param amount LP token amount to deposit.
  /// @param to The receiver of `amount` deposit benefit.
  function deposit(uint256 pid, uint256 amount, address to) external;

  /// @notice Withdraw LP tokens from MasterChef.
  /// @param pid The index of the pool. See `poolInfo`.
  /// @param amount LP token amount to withdraw.
  /// @param to Receiver of the LP tokens.
  function withdraw(uint256 pid, uint256 amount, address to) external;

  /// @notice Harvest proceeds for transaction sender to `to`.
  /// @param pid The index of the pool. See `poolInfo`.
  /// @param to Receiver of ARSW rewards.
  function harvest(uint256 pid, address to) external;

  /// @notice Withdraw LP tokens from MasterChef and harvest proceeds for transaction sender to `to`.
  /// @param pid The index of the pool. See `poolInfo`.
  /// @param amount LP token amount to withdraw.
  /// @param to Receiver of the LP tokens and ARSW rewards.
  function withdrawAndHarvest(uint256 pid, uint256 amount, address to) external;

  /// @notice Withdraw without caring about rewards. EMERGENCY ONLY.
  /// @param pid The index of the pool. See `poolInfo`.
  /// @param to Receiver of the LP tokens.
  function emergencyWithdraw(uint256 pid, address to) external;

  /// @notice send ARSW to MasterChef contract for user's farming
  /// @param amount amount of ARSW to deposit
  function depositARSW(uint256 amount) external;
}
